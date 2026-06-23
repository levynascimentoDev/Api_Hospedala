import { fileURLToPath } from 'node:url';
import { Resend } from "resend";
import path from 'node:path'
import fs from 'node:fs'



const resend = new Resend(process.env.RESEND_EMAIL_TOKEN);

interface Options {
    to:string;
    subject:string;
    username:string | null;
    code:string;
}



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export async function sendCodeCheckoutEmail(options:Options) {

    const { to, subject, username, code } = options;

    let codeSplited = code.split('')
    
    const fileDir = path.join(__dirname, '../assets/email.html')

    let content = fs.readFileSync(fileDir, 'utf-8')
        .replace('{{name}}', username ? username : "");

    for (let i:number = 0; i < codeSplited.length; i++) {
        content = content.replace(`{{code${i}}}`, `${codeSplited[i]}`)
    }
    
    await resend.emails.send({
        from:process.env.EMAIL,
        to:to,
        subject:subject,
        html:content
    })
}