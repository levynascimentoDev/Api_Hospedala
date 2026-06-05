import UserModel from "../../database/models/user.model.js";
import SesssionModel from "../../database/models/session.model.js";
import type { TokenAuthTemp, User, userCreate } from "../../types/index.js";
import { generateCode, generateID } from "../../utils/functions.js";
import { generateHash } from "../../utils/cript.js";
import Jwt from "../../utils/jwt.js";
import type { Request, Response } from "express";
import { sendEmail } from "../../utils/mail.js";
import crypto from 'crypto'

export async function authLogin(req:Request<{}, {}, {email:string}>, res:Response) {
    try {
        const { email } = req.body ;
        const user = await UserModel.getByEmail(email);
        const code:string = generateCode()


        if (!user) {
            await sendEmail(email as string, code)
        } else {
            await sendEmail(user.email as string, code, user.given_name)
        }

        const payload:TokenAuthTemp = {
            email:req.body.email,
            code:code,
            action:"checkout"   
        } 

        const token:string = Jwt.create(payload, "10m");

        res.cookie('temp_auth', token, {
            httpOnly:true,
            secure:false,
            sameSite:"strict"
        })

        return res.status(200).json({
            status:200, 
            message:"Token Has ben Created"
        })

    } catch (err) {        
        console.log(err)
        return res.status(500).json({
            status: 500,
            message: "Bad Requests",
        })
    }
}

export async function authRegister(req:Request, res:Response) {
    try {

        const {
            given_name,
            family_name,
            birth_date
        } = req.body;
        
        const payload = Jwt.decode<TokenAuthTemp>(req.temp_auth as string) as TokenAuthTemp;

        const { email } = payload;
        if (!given_name || !family_name || !birth_date) return res.status(401).json({
            status:401,
            message:"Bad Requests"
        })

        const user:userCreate = {
            email:email as string,
            given_name:given_name as string,
            family_name:family_name as string,
            birth_date:birth_date,
            role:"user",
            icon:null
        }
        
        
        // CREATE REFRESH TOKEN
        const newUser = await UserModel.create(generateID(), user);
        const expire_at = new Date();
        expire_at.setDate(expire_at.getDate() + 7);
        const refresh = crypto.randomBytes(16).toString('hex');
        
        
        const newRefreshToken = await SesssionModel.create(crypto.randomUUID(), {
            user_id:newUser?.id as number,
            refresh_token_hash:await generateHash(refresh) as string,
            expire_at:expire_at
        })

        const refreshToken = Jwt.create(
            {
                session_id:newRefreshToken.id,
                refresh_token:refresh
            },
            "7d"
        );

        // CREATE ACESS TOKEN
        const acessToken = Jwt.create(
            {
                user_id:newUser?.id,
                session_id:newRefreshToken.id
            },
            "15m"
        );


        // SET COOKIES
            // (refresh)
        res.cookie(
            'uuid_refresh',
            refreshToken,
            {
                httpOnly:true,
                secure:false,
                sameSite:"strict",
                maxAge: 7 * 24 * 60 * 60 * 1000

            }
        )
            // (acess)
        res.cookie(
            'acess_auth',
            acessToken,
            {
                httpOnly:true,
                secure:false,
                sameSite:"strict",
                maxAge: 15 * 60 * 1000
            }
        )

        res.clearCookie('temp_auth', {
            httpOnly:true,
            secure:false,
            sameSite:"strict"
        })
        
        return res.json({
            status:200,
            message:"User logged"
        })
        
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            status:500,
            message:"Internal Server Error"
        })
    }
}


export async function checkCode(req:Request<{}, {}, {code:string}>, res:Response) {
    try {
        const { code } = req.body ;

        const payload = Jwt.decode<TokenAuthTemp>(req.temp_auth as string);
    

        if (!code || !payload || !payload.code) {
            return res.status(401).json({
                status:404,
                message:"Bad Request"
            })
        } else {

            if (code != payload.code) {
                return res.status(401).json({
                    status:401,
                    message:"Bad Request"
                })
            }

            const newPayload:TokenAuthTemp = {
                email:payload.email,
                action:"complete",                
            }

            const newToken = Jwt.create(newPayload, "5m");

            res.clearCookie('temp_auth', {
                httpOnly:true,
                secure:false,
                sameSite:"strict"
            })

            res.cookie('temp_auth', newToken, {
                httpOnly:true,
                secure:false,
                sameSite:"strict"
            })
    
            return res.status(200).json({
                status:200, 
                message:"Token Has ben Created"
            })
        }


    } catch (err) {        
        console.log(err)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        })
    }
}



