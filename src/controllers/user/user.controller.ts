import type { Request, Response } from "express";
import Jwt from "../../utils/jwt.js";
import type { payloadAcess } from "../../types/index.js";
import UserModel from "../../database/models/user.model.js";
import SesssionModel from "../../database/models/session.model.js";



export async function getUsersApi(req:Request, res:Response) {
    const user = await UserModel.getByEmail(req.user?.email as string);
    
    return res.status(200).json({
        id:user?.id as number,
        given_name:user?.given_name as string,
        family_name:user?.family_name as string,
        email:user?.email as string,
        icon:user?.icon ?? null,
        role:user?.role as string    
    });
}

export async function userLogout(req:Request, res:Response<{status:number, message:string}>) {
    try {
        const payload = Jwt.decode<payloadAcess>(req.cookies.acess_auth);

        
        res.clearCookie('acess_auth', {
            httpOnly:true,
            secure:false,
            sameSite:"strict",
        })
        
        res.clearCookie('uuid_refresh', {
            httpOnly:true,
            secure:false,
            sameSite:"strict",
        })
        
        await SesssionModel.delete(payload?.session_id as string);
        return res.status(200).json({
            status:200,
            message:"User has ben logouted"
        })


    } catch (err) {
        console.log(err)
        return res.status(401).json({
            status:401,
            message:"Unthorized"
        })

    }

}