import type { registerAuthJson, googleUserinfo } from "../../utils/types.js"
import { getUserbyEmail } from "../../database/models/user.model.js"
import { getPayloadGoogleApi } from "../../utils/google.js"
import type { Request, Response } from "express"
import { registerJwt } from "../../utils/jwt.js"




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
                const authToken = registerJwt(user, false, "3d");
                res.cookie('auth_token', authToken, { 
                    httpOnly:true,
                    secure:true,
                    sameSite:"strict",
                    maxAge:3 * 24 * 60 * 60 * 1000
                });
                return res.redirect(env.FRONTEND_BASE_URI+'/home')

            } else {
                
                const token = registerJwt({
                    name:userinfo.given_name,
                    email:userinfo.email,
                    checkout:true,
                    type:"register",
                    password:null,
                    icon:userinfo.picture
                } as registerAuthJson, true, "5m");
                
                return res.redirect(`${env.FRONTEND_BASE_URI}/register/complete/${token}`)

            }
        }
        
    } catch (err) {
        return res.status(400).json({
            status:404,
            message:"Bad Requests"
        })
    }
}