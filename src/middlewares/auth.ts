import { type Response, type Request , type NextFunction} from "express";
import Jwt from "../utils/jwt.js";
import { accessJwtSchema, tempJwtSchema } from "../schemas/jwt.schema.js";
import { ApiResponse } from "../utils/response.js";
import { prisma } from "../database/db.js";

export class AuthMidlleware {
    static async AuthUser(req:Request, res:Response, next:NextFunction) {
        try {

            const token = req.cookies.access_auth as string        
            const jwt_payload = accessJwtSchema.parse(Jwt.decode(token));  
            

            const user = await prisma.users.findUnique({
                where:{
                    id:jwt_payload.user_id
                }
            });


            if (!user) {
                res.clearCookie('access_auth', {
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

            console.log(err)
            return res.status(401).json(ApiResponse.error("Unthorized"))

        }
    }


}




