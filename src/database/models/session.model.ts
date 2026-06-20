import type { Session } from '../../types/index.js';
import { prisma } from '../db.js'




class SesssionModel {
    static async create(session_id:string, options:{user_id:number, expire_at:Date, refresh_token_hash:string}) {
        
        try {

            const expire_formated = options.expire_at.toLocaleDateString();

            const session = await prisma.sessions.create({
                data:{
                    id:session_id,
                    user_id:options.user_id,
                    refresh_token_hash:options.refresh_token_hash,
                    expire_at:expire_formated                
                }
            })
            

            return session;
        } catch (err) {
            return null;
        }
       
    }

    static async getByID(session_id:string) {

        try {
            const session = await prisma.sessions.findUnique({
                where:{
                    id:session_id
                }
            })  
            return session;
        } catch (err) {
            return null
        }
        
    }


    static async delete(session_id:string) : Promise<boolean>{

        try {
            await prisma.sessions.delete( {
                where:{
                    id:session_id
                }
            })

            return true;
        } catch (err) {
            return false
        }
    }

}


export default SesssionModel;