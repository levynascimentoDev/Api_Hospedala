import mail from 'nodemailer';

const transporter = mail.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_SECRET
    }
});

export default transporter;