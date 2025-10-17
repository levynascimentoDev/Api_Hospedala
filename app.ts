import routes from './src/routes/routes.js';
import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import './src/database/db.js'

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin:"http://localhost:5000",
  credentials: true,    
}));

app.use('/api', routes);

app.listen(3000, () => {
    console.log("server iniciado!");
})