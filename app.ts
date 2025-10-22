import express from 'express'
import routes from './src/routes/routes.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import './src/configs/env.js'
import './src/database/db.js'

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin:env.FRONTEND_BASE_URI,
  credentials: true,    
}));

app.use('/api', routes);

app.listen(env.PORT, () => {
  console.log("server iniciado!");
})