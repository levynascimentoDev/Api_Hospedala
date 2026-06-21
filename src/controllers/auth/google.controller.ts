import type { googleUserinfo, TokenAuthTemp } from "../../types/index.js"
import { getPayloadGoogleApi } from "../../utils/google.js"
import type { Request, Response } from "express"
import Jwt from "../../utils/jwt.js"
import UserModel from "../../database/models/user.model.js"
import crypto from 'crypto'



export class GoogleAuthController {
    static async getClientUrl(req:Request, res:Response) {
        try {

        const urlAuth = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI_GOOGLE}&response_type=code&scope=profile email`  
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

    static async googleCallback(req:Request, res:Response) {
        try {
            const userinfo = await getPayloadGoogleApi(req.query.code as string) as googleUserinfo;
        
            if (userinfo) {
                const user = await UserModel.getByEmail(userinfo.email);
                
                if (user) {

                    const expire_at = new Date();
                    expire_at.setDate(expire_at.getDate() + 7);

            
                    const acessToken = Jwt.create(
                        {
                            user_id:user.id,
                        },"15m")
            
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
                    return res.redirect(process.env.FRONTEND_BASE_URI)

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
                    
                    return res.redirect(`${process.env.FRONTEND_BASE_URI}/auth/complete`)

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
}

