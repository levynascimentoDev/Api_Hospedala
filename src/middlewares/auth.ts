import { type Response, type Request , type NextFunction} from "express";
import type { payloadAcess, Session, User } from "../types/index.js";
import SesssionModel from "../database/models/session.model.js";
import UserModel from "../database/models/user.model.js";
import Jwt from "../utils/jwt.js";


export async function AuthUser(req:Request, res:Response, next:NextFunction) {
    try {

        const token = req.cookies.acess_auth as string        
        const payload = Jwt.decode<payloadAcess>(token) as payloadAcess;  
        if (!payload) {
            return res.status(401).json({
                status:401,
                message:"Not Authorized"
            })
        }

        const user = await UserModel.getUserbyID(payload.user_id) as User;
        const session = await SesssionModel.getByID(payload.session_id) as Session;

        if (!token || !user || !session) {

            if (!user || !session) {
                res.clearCookie('acess_auth', {
                    httpOnly:true,
                    secure:false,
                    sameSite:"strict",
                })

                res.clearCookie('uuid_refresh', {
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
        
        req.user = user as User;
        return next()

    }  catch (err) {

        console.log(err)
        return res.status(500).json({
            status:500,
            message:"Internal Server Error"
        })
    }
}


export async function AuthToken(req:Request, res:Response, next:NextFunction) {
    try {
        const token = req.cookies.temp_auth  as string
        
        if (token) {
            
            const payload = Jwt.decode(token.trim()) 
            if (!payload) { 
                return res.status(401).json({
                    status:401,
                    message:"Unthorized"
                })
            }
            
            req.temp_auth = token;
            return next();

        } else {
            return res.status(401).json({
                status:401,
                message:"Unthorized"
            })    
        }
    }  catch (err) {
        return res.status(500).json({
            status:500,
            message:"Internal Server Error"
        })
    }
}


export async function AuthRefresh(req:Request, res:Response, next:NextFunction) {
    try {

        const token = req.cookies.uuid_refresh as string
        
        if (token) {
            const payload = Jwt.decode<{session_id:string, refresh_token:string}>(token); 
            if (!payload) { 
                return res.status(401).json({
                    status:401,
                    message:"Unthorized"
                })
            }


            const session = await SesssionModel.getByID(payload.session_id);            
            const dateExpire = new Date(session?.expire_at as string);
            
            
            if (session && dateExpire < new Date()) {

                await SesssionModel.delete(session.id);

                res.clearCookie('acess_auth', {
                    httpOnly:true,
                    secure:false,
                    sameSite:"strict",
                })

                res.clearCookie('uuid_refresh', {
                    httpOnly:true,
                    secure:false,
                    sameSite:"strict",
                })

                return res.status(401).json({
                    status:401,
                    message:"Unthorized"
                })
            }
        
            
            req.session_id = payload.session_id;
            return next()

        } else {
            return res.status(401).json({
                status:401,
                message:"Unthorized"
            })    
        }
    }  catch (err) {
        console.log(err)
        return res.status(500).json({
            status:500,
            message:"Internal Server Error"
        })
    }
}



