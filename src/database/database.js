import { open } from "sqlite";
import sqlite3 from "sqlite3";

export const dbPromisse = open ({
    filename: "./src/database/Pacientes.db",
    driver: sqlite3.Database,
});

async function criarTabela() {
    const db = await dbPromisse;
    db.run(`
        CREATE TABLE IF NOT EXISTS Pacientes (
            cpf TEXT PRIMARY KEY, 
            nome TEXT,
            dataNasc TEXT,
            tel1 TEXT,
            tel2 TEXT
        )
    `)
}

criarTabela().then()