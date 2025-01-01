import express, {NextFunction} from "express";
import {error} from "../model/http/rest-response";
import {UserRole} from "../model/user.model";
import {logger} from "../utils/Logger";

/**
 * Get file with specific file (or files) for specified parameters.
 * Parameters may include: Course, Filename, uploadedDate or usernanme and more
 * @param req
 * @param res
 * @param next
 */
export function getFile(req: express.Request, res: express.Response, next: express.NextFunction) {

    // @ToDo:   Implement
    res.status(200).send({})
    return ;
}

/**
 * Function that accepts files and persists them. Adds additional metadata.
 * @param req
 * @param res
 * @param next
 */
export function uploadFile (req: express.Request, res: express.Response, next: express.NextFunction) {

    // Course and visibilty are not mandatory.
    // If course flag -> Only visible for a certain course
    // visible flag can either be private (uploaded only for yourself) or public (means searchable and viewable by everyone)
    const { filename, fileContent, course, visibility } = req.body;

    if (!filename || !fileContent) {
        // Fehlermeldung hinzufügen!
        res.status(400).send(error("Invalid format"))
        return ;
    }

    try {

        // @ToDo:   Persist File and send proper messages
        res.status(200).send({})
    } catch {
        res.status(501).send({})
    }

    return ;
}

/**
 * Delete a File
 * @param req
 * @param res
 * @param next
 */
export function deleteFile (req: any, res: express.Response, next: NextFunction) {

    const { id } = req.params;

    // @ToDo:   Get File from database
    const file = "";

    if (!file) {
        res.status(404).send(error("Resource not found"));
        return ;
    }

    const username = req.params.username;
    const role = req.role;

    if (username !== "@ToDo: Vergleichen ob ersteller der Datei" || role < UserRole.MODERATOR) {

        res.status(403).send(error("Forbidden"));
        return ;
    }

    // @ToDo:   Delete from DB

    return ;
}

export function editFile (req: any, res: express.Response, next: NextFunction) {

    return ;
}