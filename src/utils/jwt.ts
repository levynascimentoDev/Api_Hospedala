import jwt from "jsonwebtoken";

export function registerJwt(payload:object, forurl:boolean, expire: `${number}${"s" | "m" | "h" | "d"}`): string {

    const token:string = jwt.sign(payload, forurl ? env.SECRET : env.SECRET_KEY_AUTH , { expiresIn: expire }) as string;

    return token;
}

export function getPayloadJwt<Types>(code:string, forurl:boolean) : Types | undefined {
    try {
        const token = jwt.verify(code, forurl ? env.SECRET : env.SECRET_KEY_AUTH);
        return token as Types;
    } catch (err) {
        return undefined;
    }
} 

