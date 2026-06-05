declare global {
    var env:{
        SECRET_KEY_AUTH:string;
        SECRET:string;
        GOOGLE_CLIENT_ID:string;
        GOOGLE_CLIENT_SECRET:string;
        EMAIL_SECRET:string;
        EMAIL:string;
        FRONTEND_BASE_URI:string;
        REDIRECT_URI_GOOGLE:string; 
        DB_USER:string;
        DB_PASSWORD:string;
        DB_HOST:string;
        DB_NAME:string;
        DB_PORT:number;
        PORT:number;
    };
}

export {};
