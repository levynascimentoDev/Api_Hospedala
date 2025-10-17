import { Request } from "express";
import type { loginAuthJson, registerAuthJson } from "./src/utils/types";

declare module "express-serve-static-core" {
    export interface Request {
        user?: {
            id:number;
            email:string;
            name:string;
            icon?:string;
            admin:boolean

            iat: number;
            exp: number;
        };
        token_auth:string;
    }

}
