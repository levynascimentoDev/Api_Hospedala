
export interface Session{
    id:string;
    refresh_token_hash:string;
    expire_at:Date | string;
    user_id:number;
}

export interface TokenAuthTemp {
    email:string;
    action:"checkout" | "complete"
    code?:string;
    given_name?:string;
}

export interface User  extends userCreate {
    id:string;
}

export interface userCreate {
    given_name:string;
    family_name:string;
    email:string;
    birth_date:string | Date;
    icon?:string | null | undefined;
    role:"host" | "user" | "admin";
}

export interface payloadAcess {
    user_id:number;
}

export interface RequestHttp {
    status:number;
    message:string;
}



