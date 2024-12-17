import express, { Router } from "express";
import {createUser, getUserDetails} from "../controller/user.controller";
import { logger } from "../utils/Logger";

const router: Router = express.Router();

router.get("/:username", getUserDetails);
router.post("/create", createUser);

export default router;
