import express, { Router } from "express";
import { createUser, getToken, getAllUsers, getUserDetails, getPersonalInformation, deleteUser } from "../controller/user.controller";
import { authenticate } from "../middleware/authentication.middleware";

const router: Router = express.Router();

router.get("/me", authenticate, getPersonalInformation); // Retrieve personal information
router.get("/:username", authenticate, getUserDetails); // Retrieve specified users information.

router.post("/", createUser);
router.get("/", authenticate, getAllUsers);

router.post("/login", getToken);

router.delete("/delete/:username", authenticate, deleteUser)

export default router;
