import transporter from '../configs/mail.js';
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export async function sendEmail(email:string, code:string, username?:string) {
    const localFile = path.join(__dirname, '../assets/email.html')

    let fileContent:string = fs.readFileSync(localFile, 'utf-8').replace('{{name}}', username ? username : "");
    let codeArray:string[] = code.split('')
    for (let i:number = 0; i < codeArray.length; i++) {
        fileContent = fileContent.replace(`{{code${i}}}`, `${codeArray[i]}` )
    }
    
    await transporter.sendMail({
        from:env.EMAIL,
        to:email,
        subject:"Verificação de email",
        html:fileContent
    })
}