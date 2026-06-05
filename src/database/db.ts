import '../configs/env.js'
import { fileURLToPath } from 'node:url';
import path from 'node:path'
import mysql from 'mysql2/promise'
import fs from 'node:fs'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = await mysql.createPool({
    host:env.DB_HOST,
    port:env.DB_PORT,
    user:env.DB_USER,
    password:env.DB_PASSWORD,
    database:env.DB_NAME,
    multipleStatements:true
});


try {
    const connection  = await db.getConnection();
    console.log("Banco de dados conectado!");
    connection.release();
} catch (err) {
    console.log("Erro ao connectar no banco!", err)
}


const dirPath = path.join(__dirname, "migrations");
for (const file of fs.readdirSync(dirPath)) {
    try {
        const contentFile = fs.readFileSync(path.join(dirPath, file), "utf-8")
        await db.query(contentFile);
    } catch (error) {
        console.log(`Erro na migration ${file}`, error)
    }
}


export default db;