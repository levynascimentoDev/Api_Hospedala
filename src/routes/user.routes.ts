import { UserController } from "../controllers/user/user.controller.js";
import { AuthMidlleware } from "../middlewares/auth.js";
import { Router } from "express";

const userRoutes = Router();

userRoutes.get('/me', AuthMidlleware.AuthUser, UserController.getUser);
userRoutes.delete('/logout', AuthMidlleware.AuthUser, UserController.logout);

export default userRoutes;