import { type User, type userCreate } from '../../utils/types.js';
import db from '../db.js';

export async function getUserbyEmail(email:string): Promise<User | null> {
    return new Promise((resolve, reject) => {
        db.execute('SELECT * FROM users WHERE email = ?;', [email],
        (err:any, result:any[]) => {
            if (err) return reject(err as Error);
            if (result.length >= 1) {
                resolve(result[0] as User); 
            } else {
                resolve(null);
            }
        });
    });
}


export async function getUserbyID(id:number): Promise<User | null> {
    return new Promise((resolve, reject) => {
        db.execute('SELECT * FROM users WHERE id = ?;', [id],
        (err:any, result:any[]) => {
            if (err) return reject(err as Error);
            if (result.length >= 1) {
                resolve(result[0] as User); 
            } else {
                resolve(null);
            }
        });
    });
}



export async function createUser(id: number, payload: userCreate): Promise<User | undefined> {
  return new Promise((resolve, reject) => {
    db.execute(
      'INSERT INTO users(id, given_name, family_name, birth_date, email, icon, role) VALUES(?, ?, ?, ?, ?, ?, ?);',
      [id, payload.given_name, payload.family_name, payload.birth_date, payload.email, payload.icon, payload.role],
      (err: any) => {
        if (err) return reject(err);
        resolve({
          id:id,
          given_name:payload.given_name,
          family_name:payload.family_name,
          email:payload.email,
          birth_date:payload.birth_date,
          icon:payload.icon,
          role:payload.role
        });
      }
    );
  });
}

export async function alterUserbyEmail(email:string, options:{given_name?:string; family_name:string;  icon?:string; email?:string; role?:"user" | "host" | "admin";}): Promise<void> {
  return new Promise((resolve, reject) => {
    db.execute(
      `UPDATE users SET ${Object.keys(options).map(value => `${value} = ?`).join(", ")} WHERE email = '${email}';`,
      Object.values(options),
      (err: any) => {
        if (err) return reject(err);
        resolve();
      }
    );
  });
}








