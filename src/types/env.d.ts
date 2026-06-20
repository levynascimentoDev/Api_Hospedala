
declare namespace NodeJS {
    interface ProcessEnv {
        FRONTEND_BASE_URI:string;
        REDIRECT_URI_GOOGLE:string;
        DATABASE_URI:string;
        DB_USER:string;
        DB_PASSWORD:string;
        DB_HOST:string;
        DB_PORT:string;
        DB_NAME:string;
        PORT:string;    
        SECRET_KEY_AUTH:string;
        SECRET:string;
        GOOGLE_CLIENT_ID:string
        GOOGLE_CLIENT_SECRET:string;
        EMAIL_SECRET:string;
        EMAIL:string;
        NODE_ENV:'development' | 'production' | undefined
    }
}