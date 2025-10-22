import mail from 'nodemailer';

const transporter = mail.createTransport({
    service:"gmail",
    auth:{
        user:env.EMAIL,
        pass:env.EMAIL_SECRET
    }
});

export default transporter;