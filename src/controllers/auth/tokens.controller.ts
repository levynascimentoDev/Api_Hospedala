import type { TokenAuthTemp } from "../../types/index.js";
import Jwt from "../../utils/jwt.js";
import { generateCode } from "../../utils/functions.js";
import type { Request, Response } from "express";
import { sendEmail } from "../../utils/mail.js";
import SesssionModel from "../../database/models/session.model.js";
import UserModel from "../../database/models/user.model.js";


export async function refreshCode(req:Request<{}, {}, {token:string}>, res:Response) {
    try {

        const payload = Jwt.decode<TokenAuthTemp>(req.temp_auth);

        if (payload && payload.action == "checkout") {
            const newCode = generateCode() as string
            await sendEmail(payload.email, newCode as string);
        
            const newTokenCode = Jwt.create({
                ...payload,
                code:newCode
            }, "10m")


            res.clearCookie('temp_auth', {
                httpOnly:true,
                secure:false,
                sameSite:'strict'
            })

            res.cookie('temp_auth',
                newTokenCode,
                {
                    httpOnly:true,
                    secure:false,
                    sameSite:"strict"
                }
            )

            return res.status(200).json({
                status:200,
                message:"token has ben refreshed"
            });
        } else {
            return res.status(404).json({
                status:401,
                message:"Bad Request"
            });
        }
    } catch (err) {
        
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        })
    } 
}



export async function refreshToken(req:Request<{}, {}, {token:string}>, res:Response) {
    try {
        const session = await SesssionModel.getByID(req.session_id)
        const user = await UserModel.getUserbyID(session?.user_id as number)

        const newToken = Jwt.create({
            user_id:user?.id,
            session_id:session?.id
        }, "15m");
        
        res.cookie('acess_auth', 
            newToken,
            {
                httpOnly:true,
                secure:false,
                sameSite:"strict"
            }
        )
        
    
        return res.status(200).json({
            status:200,
            message:"tokens has ben refreshed"
        });
    
    } catch (err) {
        
        return res.status(500).json({
            status: 500,
            message: "Bad Requests",
        })
    } 
}

export async function tokenVerify(req:Request, res:Response) {
    try {
        
        const payload = Jwt.decode<TokenAuthTemp>(req.temp_auth);

        return res.status(200).json({
            status:200,
            message:"Authorized",
            action:payload?.action
        })
        
        
    } catch (err) {

        console.log(err)
        return res.status(500).json({
            status:500,
            message:"Internal Server Error"
        })

    }
}