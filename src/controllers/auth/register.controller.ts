import { alterUserbyEmail, createUser, getUserbyEmail } from "../../database/models/user.model.js";
import type { registerAuthJson, BadRequests, Token,  } from "../../utils/types.js";
import { generateCode, generateID } from "../../utils/functions.js";
import { getPayloadJwt, registerJwt } from "../../utils/jwt.js";
import type { Response, Request } from "express";
import { generateHash } from "../../utils/cript.js";
import { sendEmail } from "../../utils/mail.js";


export async function authRegister(req:Request<{}, {}, {email:string}>, res:Response<BadRequests | Token>) {
    try {

        console.log('teste')
        const { email } = req.body ;
        const user = await getUserbyEmail(email);
        
        if (!user) {
            const code:string = generateCode()
            const token:string = registerJwt({
                email:email,
                type:"register",
                code:code,
                name:null,
                password:null,
                checkout:false  
            } as registerAuthJson, true, "5m");
            
            await sendEmail(email, code)
            return res.status(200).json({
                status:200,
                token:token
            })
            
        } else {    
            if (req.headers["grant-type"] == "forgot-password"){
                const code:string = generateCode()
                const token:string = registerJwt({
                    email:email,
                    type:"forgot-password",
                    code:code,
                    name:null,
                    password:null,
                    checkout:false  
                } as registerAuthJson, true, "5m");
                
                await sendEmail(email, code)
                return res.status(200).json({   
                    status:200,
                    token:token
                })
            }
            return res.status(409).json({ status:409, message:"This email is already registered. Please log in." })
            
        }
    } catch (err) {
        
        return res.status(500).json({
            status: 500,
            message: "Api Error",
        })
    }
}


export async function confirmRegisterToken(req:Request<{}, {}, {code:string, token:string}>, res:Response<BadRequests | Token>) {
    try {
        const { code, token } = req.body;

        const payload = getPayloadJwt<registerAuthJson>(token, true) as registerAuthJson;
        const user = await getUserbyEmail(payload.email);

        if (code == payload.code && "register" == payload.type && !user) {
            
            const newJwtCompleteRegister = registerJwt({
                email:payload.email,
                type:"register",
                checkout:true,
                password:null,
                name:null
            } as registerAuthJson, true, "5m");
            
            return res.status(200).json({
                status:200,
                token:newJwtCompleteRegister
            });

        } else {
            if (code == payload.code && "forgot-password" == payload.type && user) {
                const newJwtCompleteRegister = registerJwt({
                    email:payload.email,
                    type:"forgot-password",
                    checkout:true,
                    password:null,
                    name:null
                } as registerAuthJson, true, "5m");
                
                return res.status(200).json({
                    status:200,
                    token:newJwtCompleteRegister
                });
            }

            return res.status(404).json({
                status:404,
                message:"Unthorized"
            });                
        }
    } catch (err) {
        
        return res.status(500).json({
            status: 500,
            message: "Api Error",
        })
    }
}


export async function registerName(req:Request<{}, {}, {token:string, name:string}>, res:Response<Token | BadRequests>) {
    try {
        const payload = getPayloadJwt<registerAuthJson>(req.body.token, true) as registerAuthJson
        if (payload && payload.type == "register" && payload.name == null && payload.checkout) {

            const newToken = registerJwt({
                name:req.body.name,
                email:payload.email,
                type:payload.type,
                password:payload.password,
                checkout:payload.checkout
            }, true, "5m");
        
            return res.status(200).json({
                status:200,
                token: newToken as string
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


export async function registerComplete(req:Request<{}, {}, {token:string, password:string}>, res:Response<{status:string, message:string} | BadRequests>) {
    try {
        const payload = getPayloadJwt<registerAuthJson>(req.body.token, true) as registerAuthJson

        if (payload && payload.type == "register" && payload.name != null && payload.password == null && payload.checkout) {

            const passwordHash = await generateHash(req.body.password as string);

            const user = await createUser(generateID(), {
                name:payload.name,
                email:payload.email,
                password:passwordHash,
                admin:false,
                icon:payload.icon != null ? payload.icon : `${env.FRONTEND_BASE_URI}/user_picture.jpg`
            })

            
            const tokenJwt = registerJwt({
                id:user?.id,
                name:user?.name,
                email:user?.email,
                admin:user?.admin
            }, false, "3d");

            res.cookie('auth_token', tokenJwt, {
                httpOnly:true,
                secure:true,
                sameSite:"strict",
                maxAge:3 * 24 * 60 * 60 * 1000
            })
        
            return res.status(200).json({
                status:200,
                message:"Authorized"
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

export async function forgotPassword(req:Request<{}, {}, {password:string}>, res:Response<{status:number; message:string;}>) {
    try {
        const payload = getPayloadJwt<registerAuthJson>(req.token_auth, true);


        if (payload && payload.type == "forgot-password" && payload.password == null) {

            const passwordHash = await generateHash(req.body.password);
            
            await alterUserbyEmail(payload.email, {password:passwordHash})
            return res.status(200).json({
                status:200,
                message:"sucess"
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


