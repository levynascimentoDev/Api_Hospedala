import { type Response, type Request , type NextFunction} from "express";
import type { payloadAcess, Session, User } from "../types/index.js";
import UserModel from "../database/models/user.model.js";
import Jwt from "../utils/jwt.js";
import { accessJwtSchema, tempJwtSchema } from "../schemas/jwt.schema.js";
import { ApiResponse } from "../utils/response.js";

export class AuthMidlleware {
    static async AuthUser(req:Request, res:Response, next:NextFunction) {
        try {

            const token = req.cookies.acess_auth as string        
            const jwt_payload = accessJwtSchema.parse(Jwt.decode(token));  
            

            const user = await UserModel.getUserbyID(jwt_payload.user_id);


            if (!user) {
                res.clearCookie('acess_auth', {
                    httpOnly:true,
                    secure:process.env.NODE_ENV == 'production',
                    sameSite:"strict",
                })
                return res.status(401).json(ApiResponse.error("Unthorized"))
            }
            
            req.user = user;
            return next()

        }  catch (err) {

            return res.status(401).json(ApiResponse.error("Unthorized"))
        }
    }

    static async AuthTempToken(req:Request, res:Response, next:NextFunction) {
        try {
            const token = req.cookies.temp_auth  as string
            const payload = tempJwtSchema.parse(Jwt.decode(token.trim()))         


            req.temp_auth = payload;
            return next();

        }  catch (err) {
            return res.status(401).json(ApiResponse.error("Unthorized"))

        }
    }


}




