import { type User, type userCreate, type UserResponse } from '../../utils/types.js';
import db from '../db.js';

export async function getUserbyEmail(email:string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
        db.execute('SELECT * FROM users WHERE email = ?;', [email],
        (err:any, result:any[]) => {
            if (err) return reject(err as Error);
            if (result.length >= 1) {
                resolve(result[0] as User); 
            } else {
                resolve(undefined);
            }
        });
    });
}


export async function createUser(id: number, payload: userCreate): Promise<UserResponse | undefined> {
  return new Promise((resolve, reject) => {
    db.execute(
      'INSERT INTO users(id, name, email, password, icon, admin) VALUES(?, ?, ?, ?, ?, ?);',
      [id, payload.name, payload.email, payload.password, payload.icon, payload.admin],
      (err: any) => {
        if (err) return reject(err);
        resolve({
            id:id,
            name:payload.name,
            email:payload.email,
            admin:payload.admin
        });
      }
    );
  });
}

export async function alterUserbyEmail(email:string, options:{name?:string; icon?:string; email?:string; admin?:boolean; password?:string;}): Promise<void> {
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






