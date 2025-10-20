import express, { type Request, type Response } from 'express'
import routes from './src/routes/routes.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import './src/database/db.js'

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin:["https://beta.hospedala.com", "http://localhost:5000"],
  credentials: true,    
}));

app.use('/api', routes);


app.listen(8080, () => {
  console.log("server iniciado!");
})