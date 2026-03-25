import { config } from "dotenv";


config({ path:'.env' });
config({ path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production' });
globalThis.env = {
    SECRET_KEY_AUTH: process.env.SECRET_KEY_AUTH as string,
    FRONTEND_BASE_URI: process.env.FRONTEND_BASE_URI as string,
    SECRET: process.env.SECRET as string,
    EMAIL: process.env.EMAIL as string,
    EMAIL_SECRET: process.env.EMAIL_SECRET as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    REDIRECT_URI_GOOGLE: process.env.REDIRECT_URI_GOOGLE as string,
    DB_HOST: process.env.DB_HOST as string,
    DB_NAME: process.env.DB_NAME as string,
    DB_USER: process.env.DB_USER as string,
    DB_PASSWORD: process.env.DB_PASSWORD as string,
    DB_PORT: parseInt(process.env.DB_PORT as string) as number,
    PORT: parseInt(process.env.PORT as string) as number
}
