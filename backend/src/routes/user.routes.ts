import express, { Router } from "express";
import {createUser} from "../controller/user.controller";

const router: Router = express.Router();

// TODO router.get("/:username", getUserDetails);
router.post("/create", createUser);

export default router;
