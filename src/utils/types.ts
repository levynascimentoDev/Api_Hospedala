
export interface BadRequests {
    status:number;
    message:string;
}

// USER REQUESTS INTERFACES

export interface User {
    id:number;
    given_name:string;
    family_name:string;
    email:string;
    birth_date:string;
    icon?:string | undefined | null;
    role:"host" | "user" | "admin";
}

export interface userCreate {
    given_name:string;
    family_name:string;
    email:string;
    birth_date:string;
    icon?:string | undefined | null;
    role:"host" | "user" | "admin";
}

export interface payloadAcess {
    user_id:number;
    session_id:string;
}

// TOKENS REQUESTS INTERFACES


export interface TokenAuthJson {
    email:string;
    type:"auth" | "oauth";
    code?:string;
    given_name?:string;
}

// GOOGLE REQUETS INTERFACES

export interface googleAuthorization {
    access_token:string;
    expires_in:number;
    refresh_token:string;
    scope:string;
    token_type:string;
    id_token:string;
}

export interface googleUserinfo {
    id:number;
    email:string;
    verified_email:boolean;
    name:string;
    given_name:string;
    family_name:string;
    picture:string;
    locale:string;
}

// SESSION INTERFACES

export interface Session {
    id:string;
    refresh_token_hash:string;
    expire_at:Date | string,
    user_id:number
}


