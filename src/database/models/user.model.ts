import db from '../db.js';
import { type User, type userCreate } from '../../types/index.js';



interface UserOptions {
    given_name?:string;
    family_name:string;  
    icon?:string; 
    email?:string; 
    role?:"user" | "host" | "admin";
}



class UserModel {

    static async getByEmail(email:string): Promise<User | null> {
        try {
            const [users] = await db.query<User[]>('SELECT * FROM users WHERE email = ?;', [email])    
            return users[0] ?? null

        } catch (err) {
            return null
        }
    }


    static async getUserbyID(id:number): Promise<User | null> {

        try {

            const [users] = await db.query<User[]>('SELECT * FROM users WHERE id = ?;', [id])
            return users[0] ?? null

        } catch (err) {
            return null
        }

    }
    
    static async create(id: number, payload: userCreate): Promise<User | null> {

        try {
            const [users] = await db.query<User[]>(
                'INSERT INTO users(id, given_name, family_name, birth_date, email, icon, role) VALUES(?, ?, ?, ?, ?, ?, ?);',
                [id, payload.given_name, payload.family_name, payload.birth_date, payload.email, payload.icon, payload.role]
            )

            return users[0] ?? null;

        } catch (err) {    
            return null;
        }
        
    }

    static async alterUserbyEmail(email:string, options:UserOptions): Promise<User | null> {

        try {
            const [users] = await db.query<User[]>(
                `UPDATE users SET ${Object.keys(options).map(value => `${value} = ?`).join(", ")} WHERE email = '${email}';`,
                Object.values(options)
            )
            return users[0] ?? null;

        } catch (err) {
            return null;
        }
        
    }

}

export default UserModel;