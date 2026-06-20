import { AuthTokenController } from "../controllers/auth/tokens.controller.js";
import { GoogleAuthController } from "../controllers/auth/google.controller.js";
import { AuthLoginController } from "../controllers/auth/login.controller.js";
import { AuthMidlleware } from "../middlewares/auth.js";
import { Router } from "express";

const authRoutes = Router()
// AUTH
authRoutes.post("/login", AuthLoginController.login);    
authRoutes.post("/register", AuthMidlleware.AuthToken, AuthLoginController.register);    
authRoutes.post('/code', AuthMidlleware.AuthToken, AuthLoginController.checkCode);

authRoutes.get('/tokens/verify', AuthMidlleware.AuthToken, AuthTokenController.tokenVerify);
authRoutes.get('/refresh/token', AuthMidlleware.AuthRefresh, AuthTokenController.refreshToken);
authRoutes.get('/refresh/code', AuthMidlleware.AuthToken, AuthTokenController.refreshCode);

// OAUTH
authRoutes.get('/google', GoogleAuthController.getClientUrl);
authRoutes.get('/google/callback', GoogleAuthController.googleCallback);

export default authRoutes;