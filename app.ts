import './src/configs/env.js';
import { testConnection } from './src/database/db.js';
import routes from './src/routes';
import cookieParser from 'cookie-parser';
import express, { type Response } from 'express';
import cors from 'cors';



(async () => await testConnection())()

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin:process.env.FRONTEND_BASE_URI,
  credentials: true,    
  methods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

app.use(routes);

app.use((_, res:Response) => {
  res.status(404).json({
    status:404,
    error:"Bad Requests, Route Not Found"
  })
});


app.listen(process.env.PORT, () => {
  console.log("server iniciado! na porta " + process.env.PORT);
})