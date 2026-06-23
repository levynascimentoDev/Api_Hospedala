import type { loginAuthJson, registerAuthJson, User, TokenAuthTemp, Accommodations } from "./index.js";


declare module "express-serve-static-core" {
    interface Request {
        user?: User;
        temp_auth?:TokenAuthTemp;
        accommodation?:Accommodations   ;
    }
}
