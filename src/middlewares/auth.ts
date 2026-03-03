import { type Response, type Request , type NextFunction} from "express";
import { getUserbyID } from "../database/models/user.model.js";
import type { payloadAcess, Session, User } from "../utils/types.js";
import { getPayloadJwt } from "../utils/jwt.js";
import { deleteSessionByID, getSessionByID } from "../database/models/session.model.js";

export async function AuthUser(req:Request, res:Response, next:NextFunction) {
    try {
        const token = req.cookies.acess_auth as string        
        const payload = getPayloadJwt(token, false) as payloadAcess 
        const user = await getUserbyID(payload.user_id) as User;
        const session = await getSessionByID(payload.session_id) as Session;


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
        return res.status(401).json({
            status:401,
            message:"Unthorized"
        })
    }
}


export async function AuthToken(req:Request, res:Response, next:NextFunction) {
    try {
        const token = req.cookies.  temp_auth as string
        
        if (token) {
            const payload = getPayloadJwt(token.trim(), true) 
            
            if (!payload) { 
                return res.status(401).json({
                    status:401,
                    message:"Unthorized"
                })
            }
            
            req.temp_auth = token;
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


export async function AuthRefresh(req:Request, res:Response, next:NextFunction) {
    try {

        const token = req.cookies.uuid_refresh as string
        
        if (token) {
            const payload = getPayloadJwt<{session_id:string, refresh_token:string}>(token, false); 
            if (!payload) { 
                return res.status(401).json({
                    status:401,
                    message:"Unthorized"
                })
            }


            const session = await getSessionByID(payload.session_id);            
            const dateExpire = new Date(session?.expire_at as string);
            
            
            if (session && dateExpire < new Date()) {

                await deleteSessionByID(session.id);

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
        return res.status(401).json({
            status:401,
            message:"Unthorized"
        })
    }
}



