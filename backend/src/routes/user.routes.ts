import express, {Router} from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getPersonalInformation,
    getToken,
    getUserDetails, setRole,
    updateUser,
    updateUserInformation
} from "../controller/user.controller";
import {authenticate} from "../middleware/authentication.middleware";
import {requireRole} from "../middleware/role.auth.middleware";
import {UserRole} from "../model/user.model";

const router: Router = express.Router();

router.post("/", createUser);
router.get("/", authenticate, requireRole(UserRole.ADMIN), getAllUsers);

router.post("/role", authenticate, requireRole(UserRole.ADMIN), setRole)
router.get("/me", authenticate, getPersonalInformation);
router.get("/:username", authenticate, requireRole(UserRole.MODERATOR), getUserDetails);

router.post("/login", getToken);
router.delete("/delete/:username", authenticate, requireRole(UserRole.MODERATOR), deleteUser)
router.post("/updateUser", authenticate, updateUser)
router.post("/updateUserInformation", authenticate, updateUserInformation)

export default router;
