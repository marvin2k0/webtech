import express, {NextFunction} from "express";
import {error, success} from "../model/http/rest-response";
import {UserRole} from "../model/user.model";
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

/**
 * Get file with specific file (or files) for specified parameters.
 * Parameters may include: Course, Filename, uploadedDate or usernanme and more
 * @param req
 * @param res
 * @param next
 */
export async function findFile(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { course, rndFilename, uploadedAt, uploadedBy, visibility, filename } = req.body;
    const attr = { course, rndFilename, uploadedAt, uploadedBy, visibility, filename };

    let searchParams: { [key: string]: any } = { };
    for (let key in attr) {
        // @ts-ignore
        if (typeof attr[key] !== "undefined" && attr[key] !== null) {
            // @ts-ignore
            searchParams[key] = attr[key];
        }
    }

    try {
        const files = await File.find(searchParams);
        res.status(200).send(success({ files }));
    } catch (error) {
        console.error("Error fetching files:", error);
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

        const username = req.username;
        const role = req.role;
        // @ToDo:   Müssen noch berechtigungen prüfen.
        //          (Ob in course, private oder public etc.)

        const filePath = path.join(__dirname, '../../uploaded_files', rndFilename);

        const mimeType = mime.getType(filePath) || 'application/octet-stream';

        // Mught adjust headers
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Content-Disposition', `inline; filename="${fileDb!.filename}"`);
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.setHeader('X-Content-Type-Options', 'nosniff');

        res.status(200).sendFile(filePath, (err: any) => {
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

        fs.writeFile("./uploaded_files/" + rndFilename, decode, (err) => {
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

        res.status(200).send(success({ fileUrl }));
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
        fs.unlink("./uploaded_files/" + file.rndFilename, (err) => {
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