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

        if (!await canGetFileCallback(req, fileDb)) {
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
                next(new InternalServerError());
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

/**
 * Putting this here because the drawings belong to the files
 * @param req
 * @param res
 * @param next
 */
export async function uploadDrawing(req: any, res: any, next: NextFunction) {

    const { rndFilename, drawing } = req.body

    if (!rndFilename || !drawing) {
        next(new InvalidFormatError());
    }

    const file = await File.findOne({rndFilename});
    if (!file) {
        next(new EntityNotFoundError("The File you are trying to add a drawing to does not exist!"))
        return ;
    }

    if (!await canGetFileCallback(req, file)) {
        next(new InsufficientRoleError());
    }

    // @ToDo:   Add drawing to databse (Storing those in the db not in the filesystem becasue theyre not as big as
    //          all the other files. We would not have been able to store videos to the db
    //          since max. document size is 16MB.

    res.status(200).send(success("Success"));
    return ;
}

export async function getDrawing(req: any, res: any, next: NextFunction) {
    const { rndFilename } = req.query;
    if (!rndFilename) {
        return ;
    }

    const file = await File.findOne({rndFilename});
    if (!file) {
        return ;
    }

    if (!await canGetFileCallback(req, file)) {
        next(new InsufficientRoleError());
    }

    let image = "data:image/png;base64,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EpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACfUrg/wOFftbrYhOjdQAAAABJRU5ErkJggg=="

    res.status(200).send(success(image));
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
