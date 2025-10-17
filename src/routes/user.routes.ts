import { getUsersApi, userLogout } from "../controllers/user/user.controller.js";
import { AuthUser } from "../middlewares/auth.js";
import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/me", AuthUser, getUsersApi);

// DELETE
userRoutes.delete('/logout', AuthUser, userLogout);

export default userRoutes;