import type { Session } from '../../types/index.js';
import db from '../db.js'



class SesssionModel {
    static async create(session_id:string, options:{user_id:number, expire_at:Date, refresh_token_hash:string}) : Promise<Session | null>{
        
        try {

            const expire_formated = options.expire_at.toLocaleDateString();

            const [results] =  await db.query<Session[]>(
                `INSERT INTO sessions(id, refresh_token_hash, expire_at, user_id) VALUES (?, ?, ?, ?);`,
                [session_id,  options.refresh_token_hash, expire_formated, options.user_id],
            )

            return results[0] ?? null;
        } catch (err) {
            return null;
        }
       
    }

    static async getByID(session_id:string) : Promise<Session | null>{


        try {
            const [sessions] = await db.query<Session[]>(
                `SELECT * FROM sessions WHERE id = ?;`,
                [session_id]
            )

            return sessions[0] ?? null;
        } catch (err) {
            return null
        }
        
    }


    static async delete(session_id:string) : Promise<boolean>{

        try {
            await db.query(
                "DELETE FROM sessions WHERE id = ?;",
                [session_id]
            )

            return true;
        } catch (err) {
            return false
        }
    }

}


export default SesssionModel;