import type { UserRequest, BadRequests, Token, checkoutToken, loginAuthJson } from "../../utils/types.js";
import { getUserbyEmail } from "../../database/models/user.model.js";
import { getPayloadJwt, registerJwt } from "../../utils/jwt.js";
import { generateCode } from "../../utils/functions.js";
import type { Request, Response } from "express";
import { verifyHash } from "../../utils/cript.js";
import { sendEmail } from "../../utils/mail.js";



export async function authLogin(req:Request<{}, {}, UserRequest>, res:Response<BadRequests | Token>) {
    try {
        const { email, password } = req.body ;
        const user = await getUserbyEmail(email);
        if (!user) {
            return res.status(404).json({
                status:404,
                message:"Not Found"
            })
        } else {
            
            const passwordOk = await verifyHash(password.trim(), user.password.trim())
            if (passwordOk) {
                
                const code:string = generateCode()
                const token:string = registerJwt({
                    email:req.body.email,
                    type:"login",
                    code:code
                } as loginAuthJson, true, "5m");
    
                (code)
                await sendEmail(user.email as string, code, user.name)
    
                return res.status(200).json({
                    status:200, 
                    token:token
                })

            } else {
                return res.status(401).json({ status:401, message:"Unthorized" })
            }
        }
    } catch (err) {        
        return res.status(500).json({
            status: 500,
            message: "Api Error",
        })
    }
}


export async function confirmLoginToken(req:Request<{}, {}, {code:string, token:string}>, res:Response) {
    try {

        const { code, token } = req.body;
        const payload = getPayloadJwt<checkoutToken>(token, true) as checkoutToken;
        const user = await getUserbyEmail(payload.email);

        if (code == payload.code && "login" == payload.type && user) {
                        
            const tokenJwt = registerJwt({
                id:user?.id,
                email:user?.email,
                icon:user?.icon,
                admin:user?.admin
            }, false , "3d");

            res.cookie('auth_token', tokenJwt, {
                httpOnly:true,
                secure:true,
                sameSite:'strict',
                maxAge: 3 * 24 * 60 * 60 * 1000
            });
            
            return res.status(200).json({
                status:200,
                message:"Authorized"
            });

        } else {
            return res.status(404).json({
                status:404,
                message:"Not Found"
            });                
        }
    } catch (err) {
        console.log("DEU BOSTA", err);
        
        return res.status(500).json({
            status: 500,
            message: "Api Error",
        })
    }
}

