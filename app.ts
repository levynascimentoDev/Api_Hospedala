import './src/configs/env.js';
import './src/database/db.js';
import routes from './src/routes/routes.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin:env.FRONTEND_BASE_URI,
  credentials: true,    
  methods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

app.use('/api', routes);

app.listen(env.PORT, () => {
  console.log("server iniciado! na porta " + env.PORT);
})