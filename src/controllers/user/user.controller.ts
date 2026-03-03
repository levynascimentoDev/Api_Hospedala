import { getUserbyEmail } from "../../database/models/user.model.js";
import type { Request, Response } from "express";
import { getPayloadJwt } from "../../utils/jwt.js";
import type { payloadAcess } from "../../utils/types.js";
import { deleteSessionByID } from "../../database/models/session.model.js";

export async function getUsersApi(req:Request, res:Response) {
    const user = await getUserbyEmail(req.user?.email as string);
    
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
        const payload = getPayloadJwt<payloadAcess>(req.cookies.acess_auth, false);

        
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
        
        await deleteSessionByID(payload?.session_id as string);
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