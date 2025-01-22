import express, { Router } from "express";
import { authenticate } from "../middleware/authentication.middleware";
import {
    editFile,
    uploadFile,
    deleteFile,
    getFile,
    findFile,
    addView,
    uploadDrawing,
    getDrawing
} from "../controller/file.controller";

const router: Router = express.Router();

router.post("/", authenticate, uploadFile);
router.get("/find", authenticate, findFile);
router.put("/edit", authenticate, editFile);
router.post("/addDrawing", authenticate, uploadDrawing);
router.get("/getDrawing", authenticate, getDrawing);
router.get("/:rndFilename", authenticate, getFile);
router.delete("/:id", authenticate, deleteFile);
router.post("/views", authenticate, addView);

export default router;
