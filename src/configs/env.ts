import { config } from "dotenv";


config({ path:".env" })
config({ path: process.env.NODE_ENV == "development" ? ".env.dev" : ".env.production" })

