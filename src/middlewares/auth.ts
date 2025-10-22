import { type Response, type Request , type NextFunction} from "express";
import { getUserbyEmail } from "../database/models/user.model.js";
import { type Payload } from "../utils/types.js";
import { getPayloadJwt } from "../utils/jwt.js";
import jwt from "jsonwebtoken";

export async function AuthUser(req:Request, res:Response, next:NextFunction) {
    try {
        const token = req.cookies.auth_token as string
        
        const payload = jwt.verify(token, env.SECRET_KEY_AUTH) as Payload 
        const user = getUserbyEmail(payload.email);

        if (!token || !user) {

            if (!user) {
                res.clearCookie('auth_token', {
                    httpOnly:true,
                    secure:false,
                    sameSite:"strict",
                })
            }
            return res.status(401).json({
                status:401,
                message:"Unthorized"
            })
        }

        req.user = payload as Payload

        return next()


    }  catch (err) {
        return res.status(401).json({
            status:401,
            message:"Unthorized"
        })
    }
}


export async function AuthToken(req:Request, res:Response, next:NextFunction) {
    try {
        let token = req.headers.authorization as string
        console.log(token && token.includes("Bearer"))
        if (token && token.includes("Bearer")) {
            token = token.replace("Bearer ", "") 
            const payload = getPayloadJwt(token.trim(), true) 

            if (!payload) {

                return res.status(401).json({
                    status:401,
                    message:"Unthorized"
                })
            }

            req.token_auth = token;

            return next()

        } else {
            return res.status(401).json({
                status:401,
                message:"Unthorized"
            })    
        }


    }  catch (err) {
        return res.status(401).json({
            status:401,
            message:"Unthorized"
        })
    }
}

