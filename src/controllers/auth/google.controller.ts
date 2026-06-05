import type { googleUserinfo, TokenAuthTemp } from "../../types/index.js"
import { getPayloadGoogleApi } from "../../utils/google.js"
import type { Request, Response } from "express"
import Jwt from "../../utils/jwt.js"
import SesssionModel from "../../database/models/session.model.js"
import UserModel from "../../database/models/user.model.js"
import { generateHash } from "../../utils/cript.js"
import crypto from 'crypto'


export async function googleAuth(req:Request, res:Response) {
    try {

        const urlAuth = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${env.GOOGLE_CLIENT_ID}&redirect_uri=${env.REDIRECT_URI_GOOGLE}&response_type=code&scope=profile email`  
        return res.status(200).json({
            status:200,
            redirect_uri:urlAuth
        })    
    


    } catch (err) {
        return res.status(500).json({
            status:404,
            message:"Internal Server Error"
        })
    }
}


export async function googleAuthCallback(req:Request, res:Response) {
    try {
        const userinfo = await getPayloadGoogleApi(req.query.code as string) as googleUserinfo;
    
        if (userinfo) {
            const user = await UserModel.getByEmail(userinfo.email);
            
            if (user) {

                const expire_at = new Date();
                expire_at.setDate(expire_at.getDate() + 7);

                // REFRESH KEY
                const refresh = crypto.randomBytes(16).toString('hex');
                
                // ADD REFRESH TOKEN HASH IN DB
                const newRefreshToken = await SesssionModel.create(crypto.randomUUID(), {
                    user_id:user.id as number,
                    refresh_token_hash:await generateHash(refresh) as string,
                    expire_at:expire_at
                })
                

                // REFRESH TOKEN
                const refreshToken = Jwt.create(
                    {
                        session_id:newRefreshToken.id,
                        refresh_token:refresh
                    }, "7d")
        
                // CREATE ACESS TOKEN
        
                const acessToken = Jwt.create(
                    {
                        user_id:user.id,
                        session_id:newRefreshToken.id
                    },"15m")
        
        
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


                const payload: TokenAuthTemp = {
                    given_name:userinfo.given_name,
                    email:userinfo.email,
                    action:"complete",
                }
                
                const token = Jwt.create(payload, "5m")
                
                res.cookie('temp_auth', token ,{
                    httpOnly:true,
                    secure:false,
                    sameSite:"strict",
                })
                
                return res.redirect(`${env.FRONTEND_BASE_URI}/auth/complete`)

            }
        } else {
            return res.status(400).json({
                status:400,
                message:"Bad Requests"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status:500,
            message:"Internal Server Error"
        })
    }
    
    
}