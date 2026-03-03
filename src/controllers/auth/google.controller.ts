import type { googleUserinfo } from "../../utils/types.js"
import { getUserbyEmail } from "../../database/models/user.model.js"
import { getPayloadGoogleApi } from "../../utils/google.js"
import type { Request, Response } from "express"
import { registerJwt } from "../../utils/jwt.js"
import { createNewSession } from "../../database/models/session.model.js"
import { generateHash } from "../../utils/cript.js"
import crypto from 'crypto'



export async function googleAuth(req:Request, res:Response) {
    try {
        if (req.headers.origin == env.FRONTEND_BASE_URI) {
            const urlAuth = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${env.GOOGLE_CLIENT_ID}&redirect_uri=${env.REDIRECT_URI_GOOGLE}&response_type=code&scope=profile email`  
            return res.status(200).json({
                status:200,
                redirect_uri:urlAuth
            })    
        } else {
            return res.status(404).json({
                status:404,
                message:"Unthorized"
            })    
        }


    } catch (err) {
        return res.status(404).json({
            status:404,
            message:"Not Found"
        })
    }
}


export async function googleAuthCallback(req:Request, res:Response) {
    try {
        const userinfo = await getPayloadGoogleApi(req.query.code as string) as googleUserinfo;
    
        if (userinfo) {
            const user = await getUserbyEmail(userinfo.email);
            
            if (user) {

                const expire_at = new Date();
                expire_at.setDate(expire_at.getDate() + 7);
                const refresh = crypto.randomBytes(16).toString('hex');
                

                const newRefreshToken = await createNewSession(crypto.randomUUID(), {
                    user_id:user.id as number,
                    refresh_token_hash:await generateHash(refresh) as string,
                    expire_at:expire_at
                })
                
                const refreshToken = registerJwt({
                    session_id:newRefreshToken.id,
                    refresh_token:refresh
                }, false, "7d");
        
        
                // CREATE ACESS TOKEN
        
                const acessToken = registerJwt({
                    user_id:user.id,
                    session_id:newRefreshToken.id
                }, false, '15m');
        
        
                // SET COOKIES
                    // (refresh)
                res.cookie(
                    'uuid_refresh',
                    refreshToken,
                    {
                        httpOnly:true,
                        secure:false,
                        sameSite:"strict",    
                        maxAge:7 * 24 * 60 * 60 * 1000
                    }
                )
                    // (acess)
                res.cookie(
                    'acess_auth',
                    acessToken,
                    {
                        httpOnly:true,
                        secure:false,
                        sameSite:"strict" ,
                        maxAge:15 * 60 * 1000   
                    }
                )
                return res.redirect(env.FRONTEND_BASE_URI)

            } else {
                
                const token = registerJwt({
                    email:userinfo.email,
                    name:userinfo.given_name,
                    type:"oauth",
                }, true, "5m");
                
                res.cookie('temp_auth', token ,{
                    httpOnly:true,
                    secure:false,
                    sameSite:"strict",
                })
                
                return res.redirect(`${env.FRONTEND_BASE_URI}/login/complete`)

            }
        } else {
            return res.status(400).json({
                status:404,
                message:"Bad Requests"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status:404,
            message:"Bad Requests"
        })
    }
    
    
}