import type { BadRequests, TokenAuthJson } from "../../utils/types.js";
import { getPayloadJwt, registerJwt } from "../../utils/jwt.js";
import { generateCode } from "../../utils/functions.js";
import type { Request, Response } from "express";
import { sendEmail } from "../../utils/mail.js";
import { getSessionByID } from "../../database/models/session.model.js";
import { getUserbyID } from "../../database/models/user.model.js";


export async function refreshCode(req:Request<{}, {}, {token:string}>, res:Response) {
    try {

        const payload = await getPayloadJwt(req.temp_auth, true) as TokenAuthJson;

        if (payload && payload.type == "auth") {
            const newCode = generateCode() as string
            await sendEmail(payload.email, newCode as string);
        
            const newTokenCode = await registerJwt({
                email:payload.email,
                code:payload.code,
                type:payload.type
            }, true, '5m')


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
                status:404,
                message:"Not Found"
            });
        }
    } catch (err) {
        
        return res.status(500).json({
            status: 500,
            message: "Bad Requests",
        })
    } 
}



export async function refreshToken(req:Request<{}, {}, {token:string}>, res:Response) {
    try {
        console.log("check")
        const session = await getSessionByID(req.session_id)
        const user = await getUserbyID(session?.user_id as number)

        const newToken = registerJwt({
            user_id:user?.id,
            session_id:session?.id
        }, false, '15m');
        
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

export async function tokenCodeVerify(req:Request, res:Response<BadRequests>) {
    try {
        
        const payload = getPayloadJwt<TokenAuthJson>(req.temp_auth, true);

        if (payload && payload.type == 'auth') {
            return res.json({
                status:200,
                message:"Authorized"
            })
        } else {
            return res.json({
                status:200,
                message:"Unauthorized"
            })
        }
        
    } catch (err) {

        console.log(err)
        return res.json({
            status:200,
            message:"Unauthorized"
        })

    }
}


export async function tokenCompleteInfo(req:Request, res:Response<BadRequests>) {
    try {

        
        const payload = getPayloadJwt<TokenAuthJson>(req.temp_auth, true);
        console.log(payload)

        if (payload && !Object.keys(payload).includes("token")) {
            return res.json({
                status:200,
                message:"Authorized"
            })
        } else {
            return res.status(401).json({
                status:401,
                message:"Unauthorized"
            })
        }
        
    } catch (err) {
        console.log(err)
        return res.json({
            status:200,
            message:"Unauthorized"
        })

    }
}