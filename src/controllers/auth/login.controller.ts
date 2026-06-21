import type { Request, Response } from "express";
import UserModel from "../../database/models/user.model.js";
import { generateCode, generateID } from "../../utils/functions.js";
import { sendEmail } from "../../utils/mail.js";
import { ApiResponse } from "../../utils/response.js";
import { loginBodySchema, registerBodySchema, codeBodySchema } from "../../schemas/auth.schema.js";
import Jwt from "../../utils/jwt.js";


export class AuthLoginController {
    static async login(req:Request, res:Response) {
        try {
            const { email } = loginBodySchema.parse(req.body) ;
            const user = await UserModel.getByEmail(email);
            const code = generateCode()


            if (!user) {
                await sendEmail(email as string, code)
            } else {
                await sendEmail(user.email as string, code, user.given_name)
            }

            const payload = {
                email:email,
                code:code,
                action:"checkout"   
            } 

            const token = Jwt.create(payload, "10m");

            res.cookie('temp_auth', token, {
                httpOnly:true,
                secure:process.env.NODE_ENV == 'production',
                sameSite:"strict"
            })


            return res
                    .status(200)
                    .json(ApiResponse.success("Token Has ben Created"))

        } catch (err) {        
            console.log(err)
            return res
                    .status(401)
                    .json(ApiResponse.error("Bad Request"))
        }
    }

    static async register(req:Request, res:Response) {
        try {

            const {
                given_name,
                family_name,
                birth_date
            } = registerBodySchema.parse(req.body);

            const { email } = req.temp_auth;
            
            
            const user = await UserModel.create(generateID(), {
                email,
                given_name,
                family_name,
                role:"user",
                birth_date:birth_date
            });


            const expire_at = new Date();
            expire_at.setDate(expire_at.getDate() + 7);

            const acessToken = Jwt.create(
                {
                    user_id:user?.id,
                },
                "15m"
            );


            res.cookie(
                'acess_auth',
                acessToken,
                {
                    httpOnly:true,
                    secure:process.env.NODE_ENV == 'production',
                    sameSite:"strict",
                    maxAge: 15 * 60 * 1000
                }
            )

            res.clearCookie('temp_auth', {
                httpOnly:true,
                secure:process.env.NODE_ENV == 'production',
                sameSite:"strict"
            })
            
            return res
                .status(200)
                .json(ApiResponse.error("User loggend"))
        
        
        } catch (err) {
            console.log(err)
            return res
                .status(401)
                .json(ApiResponse.error("Bad Request"))
        }
    }

    static async checkCode(req:Request, res:Response) {
        try {
            
            const { code } = codeBodySchema.parse(req.body) ;

            if (code != req.temp_auth.code) {
                return res.status(401).json({
                    status:401,
                    message:"Bad Request"
                })
            }

            const newPayload = {
                email:req.temp_auth.email,
                action:"complete",                
            }

            const token = Jwt.create(newPayload, "5m");

            res.clearCookie('temp_auth', {
                httpOnly:true,
                secure:process.env.NODE_ENV == 'production',
                sameSite:"strict"
            })

            res.cookie('temp_auth', token, {
                httpOnly:true,
                secure:process.env.NODE_ENV == 'production',
                sameSite:"strict"
            })
        
            return res
                .status(201)
                .json(ApiResponse.success("Token Has ben Created"))


        } catch (err) {        
            console.log(err)
            return res
                .status(401)
                .json(ApiResponse.error("Bad Request"))
        }
    }
}




