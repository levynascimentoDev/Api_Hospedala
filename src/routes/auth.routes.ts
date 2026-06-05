import { refreshCode, refreshToken, tokenVerify } from "../controllers/auth/tokens.controller.js";
import { googleAuth, googleAuthCallback } from "../controllers/auth/google.controller.js";
import { authLogin, authRegister, checkCode } from "../controllers/auth/login.controller.js";
import { AuthRefresh, AuthToken } from "../middlewares/auth.js";
import { Router } from "express";

const authRoutes = Router()

// POST
// RECEBE O POST COM O EMAIL DO USER OU VIA OAUTH DO GOOGLE 
authRoutes.post("/login", authLogin);    
// RECEBE PARTES DA AUTH 

// COMPLETAR CRIAÇÃO DE CONTA
authRoutes.post("/register", AuthToken, authRegister);    

// VERIFICAÇÃO DE EMAIL VIE CODIGO 
authRoutes.post('/code', AuthToken, checkCode);

// GET
// VERIFICAR SE O TOKEN TEMPORARRIO E VALIDO
authRoutes.get('/tokens/verify', AuthToken, tokenVerify);

// DAR UM REFRASH NO ACCES TOKEN DE LOGIN   
authRoutes.get('/refresh/token', AuthRefresh, refreshToken);
// GERAR UM NOVO CODIGO DE VERFICAÇÃO DE EMAIL
authRoutes.get('/refresh/code', AuthToken, refreshCode);

// OAUTH DO GOOGLE 
authRoutes.get('/google', googleAuth);
authRoutes.get('/google/callback', googleAuthCallback);

export default authRoutes;