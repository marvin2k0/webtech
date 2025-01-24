import express, { Router } from "express";
import {
    createUser,
    getToken,
    getAllUsers,
    getUserDetails,
    getPersonalInformation,
    deleteUser,
    updateUser, updateUserInformation
} from "../controller/user.controller";
import { authenticate } from "../middleware/authentication.middleware";
import {requireRole} from "../middleware/role.auth.middleware";
import {UserRole} from "../model/user.model";

const router: Router = express.Router();

router.get("/me", authenticate, getPersonalInformation); // Retrieve personal information
router.get("/:username", authenticate, requireRole(UserRole.MODERATOR), getUserDetails); // Retrieve specified users information.

router.post("/", createUser);
router.get("/", authenticate, requireRole(UserRole.MODERATOR), getAllUsers);

router.post("/login", getToken);

router.delete("/delete/:username", authenticate, requireRole(UserRole.MODERATOR), deleteUser)

router.post("/updateUser", authenticate, updateUser)

router.post("/updateUserInformation", authenticate, updateUserInformation)

export default router;
