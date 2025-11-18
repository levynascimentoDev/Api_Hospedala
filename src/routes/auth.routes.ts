import { refreshCode, refreshToken, tokenCodeVerify, tokenCompleteInfo } from "../controllers/auth/tokens.controller.js";
import { googleAuth, googleAuthCallback } from "../controllers/auth/google.controller.js";
import { authLogin, checkCode, registerComplete } from "../controllers/auth/login.controller.js";
import { AuthRefresh, AuthToken } from "../middlewares/auth.js";
import { Router } from "express";

const authRoutes = Router()

// POST
authRoutes.post("/login", authLogin);    
authRoutes.post("/register", AuthToken, registerComplete);    
authRoutes.post('/code', AuthToken, checkCode);

// GET
authRoutes.get('/tokens/verify_code', AuthToken, tokenCodeVerify);
authRoutes.get('/tokens/complete_info', AuthToken, tokenCompleteInfo);
authRoutes.get('/refresh/token', AuthRefresh, refreshToken);
authRoutes.get('/refresh/code', AuthToken, refreshCode);
authRoutes.get('/google', googleAuth);
authRoutes.get('/google/callback', googleAuthCallback);

export default authRoutes;