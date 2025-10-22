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
        DATABASE_URI:string;
        PORT:number;
    };
}

export {};