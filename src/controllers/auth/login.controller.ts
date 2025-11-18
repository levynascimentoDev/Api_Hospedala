import { createUser, getUserbyEmail } from "../../database/models/user.model.js";
import { createNewSession } from "../../database/models/session.model.js";
import type { TokenAuthJson, User, userCreate } from "../../utils/types.js";
import { generateCode, generateID } from "../../utils/functions.js";
import { generateHash } from "../../utils/cript.js";
import {  getPayloadJwt, registerJwt } from "../../utils/jwt.js";
import type { Request, Response } from "express";
import { sendEmail } from "../../utils/mail.js";
import crypto from 'crypto'

export async function authLogin(req:Request<{}, {}, {email:string}>, res:Response) {
    try {
        const { email } = req.body ;
        const user = await getUserbyEmail(email);
        const code:string = generateCode()


        if (!user) {
            await sendEmail(email as string, code)
        } else {
            await sendEmail(user.email as string, code, user.given_name)
        }

        const token:string = registerJwt({
            email:req.body.email,
            type:"auth",
            code:code
        } as TokenAuthJson, true, "5m");


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

export async function registerComplete(req:Request, res:Response) {
    try {

        const {
            given_name,
            family_name,
            birth_date
        } = req.body;
        
        const payload = getPayloadJwt<TokenAuthJson>(req.temp_auth, true);

        const email = payload?.email



        if (!given_name || !family_name || !birth_date) return res.status(500).json({
            status:500,
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
        const newUser = await createUser(generateID(), user);
        const expire_at = new Date();
        expire_at.setDate(expire_at.getDate() + 7);
        const refresh = crypto.randomBytes(16).toString('hex');
        
        console.log(expire_at)
        
        const newRefreshToken = await createNewSession(crypto.randomUUID(), {
            user_id:newUser?.id as number,
            refresh_token_hash:await generateHash(refresh) as string,
            expire_at:expire_at
        })

        const refreshToken = registerJwt({
            session_id:newRefreshToken.id,
            refresh_token:refresh
        }, false, "7d");


        // CREATE ACESS TOKEN

        const acessToken = registerJwt({
            user_id:newUser?.id,
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
            message:"Bad Requests"
        })
    }
}


export async function checkCode(req:Request<{}, {}, {code:number}>, res:Response) {
    try {
        const { code } = req.body ;

        const payload = getPayloadJwt<TokenAuthJson>(req.temp_auth as string, true);
    

        if (!code || !payload || !payload.code) {
            return res.status(404).json({
                status:404,
                message:"Unthorized"
            })
        } else {

            const newPayload:TokenAuthJson = {
                email:payload.email,
                type:payload.type,                
            }

            const newToken = registerJwt(newPayload, false, '5m');

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
            message: "Bad Requests",
        })
    }
}



