import type { Session } from '../../utils/types.js';
import db from '../db.js'


export async function createNewSession(session_id:string, options:{user_id:number, expire_at:Date, refresh_token_hash:string}) : Promise<Session>{
    return new Promise((resolve, reject) => {
        const pad = (n: number) => n.toString().padStart(2, '0');
        const dateFormat = `${options.expire_at.getFullYear()}-${pad(options.expire_at.getMonth()+1)}-${pad(options.expire_at.getDate())}`   

        db.query(`INSERT INTO sessions(id, refresh_token_hash, expire_at, user_id) VALUES (?, ?, ?, ?);`,
            [session_id,  options.refresh_token_hash, dateFormat, options.user_id],
            (err) => {
                if (err) { return reject(err)}
                resolve({
                    id:session_id,
                    expire_at:options.expire_at,
                    refresh_token_hash:options.refresh_token_hash,
                    user_id:options.user_id
                });
            }
        )
    })
}


export async function getSessionByID(session_id:string) : Promise<Session | null>{
    return new Promise((resolve, reject) => {

        db.query(`SELECT * FROM sessions WHERE id = ?;`,
            [session_id],
            (err, results:any[]) => {
                if (err) { return reject(err)}

                if (results.length) {
                    resolve({
                        id:session_id,
                        expire_at:results[0].expire_at,
                        refresh_token_hash:results[0].refresh_token_hash,
                        user_id:results[0].user_id
                    });
                } else {
                    resolve(null);
                }          

            }
        )
    })
}



export async function deleteSessionByID(session_id:string) : Promise<void>{
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM sessions WHERE id = ?;`,
            [session_id],
            (err) => {
                if (err) { return reject(err)};
                resolve();
            }
        )
    })
}