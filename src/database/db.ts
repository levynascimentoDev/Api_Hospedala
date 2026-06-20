import '../configs/env.js'
import { PrismaClient } from '../../generated/prisma/client.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';


const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
})

const prisma = new PrismaClient({ adapter }) 

const testConnection = async () => {
    try {
        await prisma.$connect();
        console.log("✅ Banco de dados iniciado com sucesso!")
    } catch (error) {
        console.log("❌ Erro ao connectar no banco de dados");
        console.log(error);
    }
}

export { 
    prisma,
    testConnection  
}
