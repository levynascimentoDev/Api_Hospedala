
export type Token =  {
    status:number;
    token:string;
    type?:string;
}

export interface UserRequest {
    email:string;
    password:string;
}


export interface BadRequests {
    status:number;
    message:string;
}

export interface checkoutToken {
    email:string;
    type:string;
    code:string
    iat:number;
    exp:number;
}

export interface User {
    id:number;
    name:string;
    email:string;
    password:string;
    icon:string;
    admin:boolean;
}

export type UserResponse = {
    id:number;
    name:string;
    email:string;
    icon?:string | null;
    admin:boolean;
}

export interface Payload {
    id:number;
    name:string;
    email:string;
    icon?:string;
    admin:boolean;
    iat: number;
    exp: number;
}

export interface userCreate {
    name:string;
    email:string;
    password:string;
    icon?:string | null;
    admin:boolean;
}

export interface loginAuthJson {
    email:string;
    type:"register" | "login" | "forgot-password";
    code?:string;
}

export interface registerAuthJson extends loginAuthJson {
    name:string | null;
    password:string | null;
    checkout:boolean;
    icon?:string | null;
}


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

