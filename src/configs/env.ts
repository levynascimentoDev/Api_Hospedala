import { config } from "dotenv";

config();
export const SECRET_KEY_AUTH = process.env.SECRET_KEY_AUTH as string;
export const FRONTEND_BASE_URI = process.env.FRONTEND_BASE_URI as string;
export const SECRET = process.env.SECRET as string;
export const EMAIL = process.env.EMAIL as string;
export const EMAIL_SECRET = process.env.EMAIL_SECRET as string;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
export const REDIRECT_URI_GOOGLE = process.env.REDIRECT_URI_GOOGLE as string;
export const SMTP_KEY = process.env.SMTP_KEY as string;
export const SMTP_EMAIL = process.env.SMTP_EMAIL as string;
export const SMTP_LOGIN = process.env.SMTP_LOGIN as string;
export const DATABASE_URI = process.env.DATABASE_URI as string;