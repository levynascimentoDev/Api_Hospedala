import type { Request, Response } from "express";
import UserModel from "../../database/models/user.model.js";
import { ApiResponse } from "../../utils/response.js";


export class UserController {
    static async getUser(req:Request, res:Response) {
        const user = await UserModel.getByEmail(req.user?.email!);
    
        return res.status(200).json(ApiResponse.success("Authorized", user))
    }

    static async logout(_:Request, res:Response) {
        try {

            
            res.clearCookie('acess_auth', {
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


