import { open } from "sqlite";
import sqlite3 from "sqlite3";

export const dbPromisse = open ({
    filename: "./src/database/Agenda.db",
    driver: sqlite3.Database,
});

async function criarTabela() {
    const db = await dbPromisse;
    db.exec(`
        CREATE TABLE IF NOT EXISTS Pacientes (
            cpf TEXT PRIMARY KEY, 
            nome TEXT,
            dataNasc TEXT,
            tel1 TEXT,
            tel2 TEXT
        );

        CREATE TABLE IF NOT EXISTS Adm(
            id TEXT PRIMARY KEY,
            login TEXT,
            senha TEXT
        );

        CREATE TABLE IF NOT EXISTS TokensAtivos(
            token TEXT PRIMARY KEY,
            usuario_id TEXT
        );
    `)
}

criarTabela().then()