import { authRegister, confirmRegisterToken, registerName, registerComplete, forgotPassword } from "../controllers/auth/register.controller.js";
import { googleAuth, googleAuthCallback } from "../controllers/auth/google.controller.js";
import { authLogin, confirmLoginToken } from "../controllers/auth/login.controller.js";
import { verifyLoginToken, verifyRegisterToken, refreshToken } from "../controllers/auth/tokens.controller.js";
import { AuthToken } from "../middlewares/auth.js";
import { Router } from "express";

const authRoutes = Router()

// POST (login)
authRoutes.post("/login", authLogin);    
authRoutes.post('/login/verify', confirmLoginToken);

// POST (register)
authRoutes.post("/register", authRegister);    
authRoutes.post('/register/verify', confirmRegisterToken);
authRoutes.post('/register/username', registerName);
authRoutes.post('/register/complete', registerComplete);

// GET
authRoutes.get('/login/tokens', AuthToken, verifyLoginToken);
authRoutes.get('/register/tokens', AuthToken, verifyRegisterToken);
authRoutes.get('/google', googleAuth);
authRoutes.get('/google/callback', googleAuthCallback);

// PATCH
authRoutes.patch('/token/refresh', refreshToken);
authRoutes.patch('/login/forgot-password', AuthToken, forgotPassword);

export default authRoutes;