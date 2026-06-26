import type { Request, Response } from "express";
import { generateCode, generateID } from "../../utils/functions.js";
import { sendCodeCheckoutEmail } from "../../utils/mail.js";
import { ApiResponse } from "../../utils/response.js";
import { loginBodySchema, registerBodySchema, codeBodySchema } from "../../schemas/auth.schema.js";
import Jwt from "../../utils/jwt.js";
import { prisma } from "../../database/db.js";


export class AuthLoginController {
    static async login(req:Request, res:Response) {
        try {

            const { email } = loginBodySchema.parse(req.body) ;
            const user = await prisma.users.findUnique({
                where:{
                    email:email
                }
            })
            const code = generateCode()



            await sendCodeCheckoutEmail({
                subject:"Verificação de Email",
                code,
                to:email,
                username:user?.given_name ?? null
            })



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

            const { email } = req.temp_auth!;
            
            const user = await prisma.users.create({
                data:{
                    id:generateID(),
                    email,
                    given_name,
                    family_name,
                    role:"USER",
                    birth_date:birth_date
                }
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
                'access_auth',
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
                .json(ApiResponse.success("Authorized"))
        
        
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

            if (code != req.temp_auth?.code) {
                return res.status(401).json({
                    status:401,
                    message:"Bad Request"
                })
            }

            const user = await prisma.users.findUnique({
                where:{
                    email:req.temp_auth.email
                }
            })
            
            if (user) {  
                const acessToken = Jwt.create({ user_id:user.id },"15m")


                res.clearCookie('temp_auth', {
                    httpOnly:true,
                    secure:process.env.NODE_ENV == 'production',
                    sameSite:"strict"
                })
        
                res.cookie(
                    'access_auth',
                    acessToken,
                    {
                        httpOnly:true,
                        secure:process.env.NODE_ENV == "production",
                        sameSite:"strict" ,
                        maxAge:15 * 60 * 1000   
                    }
                )
                
                return res.status(200).json(
                    ApiResponse.success("Authorized", {
                        redirect:"/"
                    })
                );
            }

            const cookie = {
                email:req.temp_auth.email,
                action:"complete",                
            }


            const token = Jwt.create(cookie, "5m");


            res.cookie('temp_auth', token, {
                httpOnly:true,
                secure:process.env.NODE_ENV == 'production',
                sameSite:"strict"
            })
        
            return res
                .status(201)
                .json(ApiResponse.success("Token Has ben Updated", {
                    redirect:"/auth/complete"
                }))


        } catch (err) {        
            console.log(err)
            return res
                .status(401)
                .json(ApiResponse.error("Bad Request"))
        }
    }
}




