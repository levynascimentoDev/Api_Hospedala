import type { userCreate } from '../../types/index.js';
import { prisma } from '../db.js';


interface UserOptions {
    given_name?:string;
    family_name:string;  
    icon?:string; 
    email?:string; 
    role?:"user" | "host" | "admin";
}



class UserModel {

    static async getByEmail(email:string) {
        try {
            const user = await prisma.users.findUnique({
                where:{
                    email
                }
            })    
            return user;

        } catch (error) {
            return null
        }
    }


    static async getUserbyID(id:string) {

        try {

            const user = await prisma.users.findUnique({
                where:{
                    id
                }
            })
            return user;

        } catch (error) {
            return null
        }

    }
    
    static async create(id: string, payload: userCreate) {

        try {
            const user = await prisma.users.create({
                data:{
                    id,
                    ...payload
                }
            })

            return user;

        } catch (error) {    
            console.log(error)
        }
        
    }

    static async alterUserbyEmail(email:string, options:UserOptions) {

        try {
            const user = await prisma.users.update({
                where:{
                    email
                },
                data:{
                    ...options
                }
            })
            return user;

        } catch (error) {
            return null;
        }
        
    }

}

export { UserModel };