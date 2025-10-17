import { getUserbyEmail } from "../../database/models/user.model.js";
import type { UserResponse } from "../../utils/types.js";
import type { Request, Response } from "express";

export async function getUsersApi(req:Request, res:Response<UserResponse>) {
    const user = await getUserbyEmail(req.user?.email as string);
    
    return res.status(200).json({
        id:user?.id as number,
        name:user?.name as string,
        email:user?.email as string,
        icon:user?.icon ?? null,
        admin:user?.admin as boolean    
    });
}

export async function userLogout(_:Request, res:Response<{status:number, message:string}>) {

    res.clearCookie('auth_token', {
        httpOnly:true,
        secure:true,
        sameSite:"strict"
    })

    return res.status(200).json({
        status:200,
        message:"User Logout"
    });

}