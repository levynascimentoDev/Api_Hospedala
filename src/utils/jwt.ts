import jwt from "jsonwebtoken";


class Jwt {
    static create(payload:Object, expire:`${number}${"s" | "m" | "h" | "d"}`): string {
        const token:string = jwt.sign(
            payload,
            env.SECRET_KEY_AUTH , 
            { expiresIn:expire }
        ) as string;

        return token;
    }

    static decode<T>(token:string): T | null {
        try {
            
            const payload = jwt.verify(token, env.SECRET_KEY_AUTH);
            return payload as T;
        } catch (err) {
            return null;
        }
        
    }

    
}

export default Jwt;

