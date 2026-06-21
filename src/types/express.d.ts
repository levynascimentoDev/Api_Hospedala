import type { loginAuthJson, registerAuthJson, User, TokenAuthTemp } from "./index.js";


declare module "express-serve-static-core" {
    interface Request {
        user?: User;
        temp_auth:TokenAuthTemp;
    }
}
