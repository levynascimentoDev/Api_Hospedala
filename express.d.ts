import { Request } from "express";
import type { loginAuthJson, registerAuthJson, User } from "./src/utils/types";

declare module "express-serve-static-core" {
    export interface Request {
        user?: User;
        temp_auth:string;
        session_id:string
    }

}
