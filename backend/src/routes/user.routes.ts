import express, { Router } from "express";
import {createUser} from "../controller/user.controller";

const router: Router = express.Router();

// TODO router.get("/:username", getUserDetails);
router.post("/", createUser);

export default router;
