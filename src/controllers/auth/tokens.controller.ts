import type { BadRequests, checkoutToken, loginAuthJson, registerAuthJson, Token } from "../../utils/types.js";
import { getPayloadJwt, registerJwt } from "../../utils/jwt.js";
import { generateCode } from "../../utils/functions.js";
import type { Request, Response } from "express";
import { sendEmail } from "../../utils/mail.js";



export async function verifyRegisterToken(req:Request, res:Response<{status:number; token:string; email?:string} | BadRequests>) {
    try {
        const token:string = req.token_auth as string 
        const grant_type:string = req.headers["grant-type"] as string
        const payload = getPayloadJwt(token, true) as any;


        if (payload && ["email", "type", "password", "name", "checkout"].every(key => Object.keys(payload).includes(key))) {
            if (payload.type as string == "register" && grant_type == "username" && payload.name == null && payload.password == null && payload.checkout) {
                return res.status(200).json({
                    status:200,
                    token:token as string,
                });            
            } else if (payload.type as string == "register" && grant_type == "complete" && payload.name != null && payload.password == null && payload.checkout) {
                return res.status(200).json({
                    status:200,
                    token:token as string,
                });
            } else if (payload.type as string == "register" && grant_type == "checkout" && payload.name == null && payload.password == null && !payload.checkout) {
                return res.status(200).json({
                    status:200,
                    token:token as string,
                    email:payload.email
                });
            } else if (payload.type as string == "forgot-password" && grant_type == "forgot-password" && payload.name == null && payload.password == null && !payload.checkout) {
                return res.status(200).json({
                    status:200,
                    token:token as string,
                    email:payload.email
                });
            } else {
                 return res.status(404).json({
                    status:404,
                    message:"Unthorized"
                });
            }

        }

        return res.status(404).json({
            status:404,
            message:"Not Found"
        });

    } catch (err) {

        return res.status(404).json({
            status:404,
            message:"Not Found"
        });

    }
}


export async function verifyLoginToken(req:Request, res:Response<{status:number; token:string; email:string;} | BadRequests>) {
    try {
        const token = req.token_auth as string;
        const payload = getPayloadJwt<checkoutToken>(token, true) as checkoutToken;
        if (payload && payload.type == "login") {

            return res.status(200).json({
                status:200,
                token:token as string,
                email:payload.email as string
            });            
        }

        return res.status(404).json({
            status:404,
            message:"Not Found"
        });

    } catch (err) {

        return res.status(404).json({
            status:404,
            message:"Not Found"
        });

    }
}


export async function refreshToken(req:Request<{}, {}, {token:string}>, res:Response<Token | BadRequests>) {
    try {

        const payload = await getPayloadJwt<loginAuthJson | registerAuthJson>(req.body.token, true);


        if (payload) {
            const newCode = generateCode() as string
            await sendEmail(payload.email, newCode as string);
        
            const newToken = await registerJwt({ email:payload.email, code:newCode, type:payload.type }, true, '5m')
            return res.status(200).json({
                status:200,
                token:newToken,
                type:payload.type
            });
        } else {
            return res.status(404).json({
                status:404,
                message:"Not Found"
            });
        }
    } catch (err) {
        
        return res.status(500).json({
            status: 500,
            message: "Api Error",
        })
    } 
}