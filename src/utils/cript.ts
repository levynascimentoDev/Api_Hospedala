import bcrypt from 'bcrypt'

const GENSALT = 10;

export async function generateHash(password:string) : Promise<string> {
    const hash:string = await bcrypt.hash(password, GENSALT) as string;
    return hash;
}

export async function verifyHash(password:string, passwordHash:string) : Promise<boolean> {
    return await bcrypt.compare(password, passwordHash) as boolean;
}