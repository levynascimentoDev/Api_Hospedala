import { EMAIL, EMAIL_SECRET, SMTP_KEY, SMTP_LOGIN } from './env.js';
import mail from 'nodemailer';

const transporter = mail.createTransport({
    service:"gmail",
    // host:"smtp-relay.brevo.com",
    // port:587,
    // secure:false,
    auth:{
        user:EMAIL,
        pass:EMAIL_SECRET
    }
});

export default transporter;