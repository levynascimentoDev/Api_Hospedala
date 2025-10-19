import { DISCLOUD_DATABASE } from '../configs/env';
import { fileURLToPath } from 'node:url';
import path from 'node:path'
import mysql from 'mysql2'
import fs from 'node:fs'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = mysql.createConnection(DISCLOUD_DATABASE);

db.connect(err => {
    if (err) return console.log("Erro ao conectar no banco e dados!", err);
    console.log("Banco de dados conectado")
    const DirPath = path.join(__dirname, 'migrations');
    fs.readdirSync(DirPath).forEach(file => {
        const contentFile = fs.readFileSync(path.join(DirPath, file), 'utf-8')
        db.execute(contentFile, err => {
            if (err) return console.log(`Erro ao executar Migration ${file}`);
        })
    })
})

export default db;