import express, { Router } from "express";
import { authenticate } from "../middleware/authentication.middleware";
import { editFile, uploadFile, deleteFile, getFile } from "../controller/file.controller";

const router: Router = express.Router();

router.get("/", authenticate, getFile);
router.post("/", authenticate, uploadFile);
router.put("/edit", authenticate, editFile);
router.delete("/delete/:id", authenticate, deleteFile);

export default router;
