import type { Request, Response } from "express";
import { ApiResponse } from "../../utils/response.js";


export class UserController {
    static async getUser(req:Request, res:Response) {
        return res.status(200).json(ApiResponse.success("Authorized", req.user))
    }

    static async logout(_:Request, res:Response) {
        try {

            
            res.clearCookie('access_auth', {
                httpOnly:true,
                secure:process.env.NODE_ENV == "production",
                sameSite:"strict",
            })
            
            
            return res.status(200).json(ApiResponse.success("User has ben logouted"))


        } catch (err) {
            console.log(err)
            return res.status(401).json(ApiResponse.success("Unthorized"))

        }
    }
}


