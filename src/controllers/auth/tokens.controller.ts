import Jwt from "../../utils/jwt.js";
import { generateCode } from "../../utils/functions.js";
import type { Request, Response } from "express";
import { sendEmail } from "../../utils/mail.js";
import { ApiResponse } from "../../utils/response.js";

export class AuthTokenController {
    static async refreshCode(req:Request, res:Response) {
        try {

            const { action, email } = req.temp_auth;

            if (action == "checkout") {
                const newCode = generateCode() as string
                await sendEmail(email, newCode as string);
            
                const newTokenCode = Jwt.create({
                    ...req.temp_auth,
                    code:newCode
                }, "10m")


                res.cookie('temp_auth',
                    newTokenCode,
                    {
                        httpOnly:true,
                        secure:process.env.NODE_ENV == 'production',
                        sameSite:"strict"
                    }
                )

                return res.status(200).json(ApiResponse.success("token has ben refreshed"));
            } else {
                return res.status(401).json(ApiResponse.error("Unthorized"));
            }
        } catch (err) {
            console.log(err)
            return res.status(400).json(ApiResponse.error("Bad Request"));            
        }
    }

    
    static async tokenVerify(req:Request, res:Response) {
        try {
            

            const { action } = req.temp_auth;
            
            return res.status(200).json({
                status:200,
                message:"Authorized",
                action:action
            })
            
            
        } catch (err) {

            console.log(err)
            return res.status(400).json(ApiResponse.error("Bad Request"));            
        }
    }

}

