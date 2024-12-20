import express, { Router } from "express";
import { createUser, getToken, getAllUsers, getUserDetails, getPersonalInformation } from "../controller/user.controller";
import { authenticate } from "../middleware/authentication.middleware";

const router: Router = express.Router();

router.get("/me", authenticate, getPersonalInformation);
router.get("/:username", getUserDetails)

// TODO router.get("/:username", getUserDetails);
router.post("/", createUser);
router.get("/", authenticate, getAllUsers);

router.post("/login", getToken);

export default router;
