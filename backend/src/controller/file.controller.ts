import express, {NextFunction} from "express";
import {error, success} from "../model/http/rest-response";
import {InvalidFormatError} from "../error/invalid.format.error";
import File, {FileDetails, VisibilityTypes} from "../model/file.model";
import { Buffer } from "buffer";
import * as fs from 'fs';
import {logger} from "../utils/Logger";
import { v4 as uuidv4 } from "uuid";
import {EntityNotFoundError} from "../error/entity.not.found.error";
import {InternalServerError} from "../error/internal.server.error";
import path from "node:path";
import mime from "mime";
import {InsufficientRoleError} from "../error/insufficient.role.error";
import User, {EMPTY_USER, UserDetails, UserRole} from "../model/user.model";


const uploadDirectory = process.env.FILES_DIR || "/app/user_uploads/";

/**
 * Get file with specific file (or files) for specified parameters.
 * Parameters may include: Course, Filename, uploadedDate or usernanme and more
 * @param req
 * @param res
 * @param next
 */
export async function findFile(req: any, res: any, next: NextFunction) {

    // With the new way the search works, doing this is unnesccary.
    // though im keeping this, just in case i want to adjust
    // the way the search works in the frontend
    const { rndFilename, filename, description, uploadedBy, course, fileType } = req.query;
    const attr = { rndFilename, filename, description, uploadedBy, course, fileType };

    let searchParams: { [key: string]: any }[] = [];

    for (let key in attr) {
        if (attr.hasOwnProperty(key)) {
            // @ts-ignore
            searchParams.push({ [key]: {$regex: `${attr[key]}`, $options: "i"} })
        }
    }

    try {
        let files = await File.find({ $or: searchParams });

        const filteredFiles = await Promise.all(
            files.map(async file => ({
                file,
                canGet: await canGetFileCallback(req, file),
            }))
        );

        files = filteredFiles
            .filter(({ canGet }) => canGet)
            .map(({ file }) => file);

        res.status(200).send(success(files));
    } catch (error) {
        logger.error("Error fetching files:", error);
        next(error);
    }
}

export async function getFile(req: any, res: any, next: NextFunction) {
    try {
        const { rndFilename } = req.params;

        if (!rndFilename) {
            throw new InvalidFormatError();
        }

        const fileDb = await File.findOne({ rndFilename });
        if (!fileDb) {
            throw new EntityNotFoundError("File not found");
        }

        if (!canGetFileCallback(req, fileDb)) {
            throw new InsufficientRoleError();
        }

        const filePath = path.join(uploadDirectory, rndFilename);
        const mimeType = mime.getType(filePath) || 'application/octet-stream';

        // Mught adjust headers
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Content-Disposition', `inline; filename="${fileDb!.filename}"`);
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.setHeader('X-Content-Type-Options', 'nosniff');

        res.status(200).sendFile(path.resolve(filePath), (err: any) => {
            if (err) {
                console.error('Error sending file:', err);
                throw new InternalServerError();
            }
        });
    } catch (err) {
        logger.error('Error handling request:', err);
        next(err);
    }
}


/**
 * Function that accepts files and persists them. Adds additional metadata.
 * @param req
 * @param res
 * @param next
 */
export async function uploadFile(req: any, res: express.Response, next: express.NextFunction) {

    // Course and visibility are not mandatory.
    // If course flag -> Only visible for a certain course
    // visible flag can either be private (uploaded only for yourself) or public (means searchable and viewable by everyone)
    const { filename, fileContent, course, visibility, description } = req.body;

    try {

        if (!filename || !fileContent || (!course && !visibility)) {
            throw new InvalidFormatError();
        }

        const decode = Buffer.from(fileContent, 'base64')
        const fileSize = decode.length;
        const fileType = filename.split(".").pop();
        const rndFilename: string = uuidv4() + "." + fileType;
        const fileUrl = "http://localhost:8080/files/" + rndFilename
        const filePath = path.join(uploadDirectory, rndFilename)

        fs.writeFile(filePath, decode, (err) => {
            if (err) {
                logger.error('Error writing file:', err);
                throw new InternalServerError();
            }
        });

        const file = new File({
            rndFilename,
            filename,
            fileType,
            description,
            fileUrl,
            fileSize,
            uploadedBy: req.username,
            course,
            visibility,
        });
        await file.save();

        res.status(200).send(success({ rndFilename, fileUrl }));
    } catch(err: unknown) {
        next(err);
    }

    return ;
}

/**
 * Delete a File using its rndFilename
 * @param req
 * @param res
 * @param next
 */
export async function deleteFile(req: any, res: express.Response, next: NextFunction) {

    const { id } = req.params;
    const file = await File.findOne({rndFilename: id}).exec();

    if (!file) {
        throw new EntityNotFoundError(id);
    }

    const username = req.username;
    const role = req.role;

    if (username !== file.uploadedBy && role < UserRole.MODERATOR) {
        throw new InvalidFormatError();
    }

    try {
        const fileDeleted = await File.findByIdAndDelete(file._id).exec();
        fs.unlink(path.join(uploadDirectory, file.rndFilename), (err) => {
            if (err) {
                throw new InternalServerError();
            }
        })
    } catch (err) {
        logger.error("Error while deleting file:", err);
        next(new InternalServerError());
    }

    res.status(200).send(success("Success"));
}

export function editFile(req: any, res: express.Response, next: NextFunction) {

    return;
}

export async function addView(req: any, res: express.Response, next: NextFunction) {
    const { rndFilename } = req.body;

    try {
        if (!rndFilename) {
            throw new InvalidFormatError();
        }

        // Might want to do something with that
        const viewedFile = await File.findOneAndUpdate({rndFilename: rndFilename}, { $inc: { views: 1 } } )

    } catch (e) {
        next(e)
    }
}

async function canGetFileCallback(req: any, file: FileDetails) {
    // Admins are able to do everything
    if ([UserRole.ADMIN, UserRole.MODERATOR].includes(req.role)) {
        return true;
    }

    switch (file.visibility) {
        case VisibilityTypes.PUBLIC:
            // Visible for everyone, just keep :)
            return true;
        case VisibilityTypes.PRIVATE:
            return req.username === file.uploadedBy;
        case VisibilityTypes.COURSE:
            const user = await User.findOne({ username: req.username})

            // @ts-ignore
            return user!.enrolledCourses && user!.enrolledCourses.includes(file.course);
    }
}