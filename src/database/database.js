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

        CREATE TABLE IF NOT EXISTS TokensAtivos(
            token TEXT PRIMARY KEY,
            usuario_id TEXT
        );
        
        CREATE TABLE IF NOT EXISTS Profissionais(
            id INTEGER PRIMARY KEY,
            login TEXT UNIQUE,
            senha TEXT,
            cargo TEXT
        );

        CREATE TABLE IF NOT EXISTS Medicos(
            id_profissional PRIMARY KEY,
            rg TEXT,
            nome TEXT,
            especialidade TEXT,
            tel1 TEXT,
            tel2 TEXT,
            status TEXT,
            FOREIGN KEY(id_profissional) REFERENCES Profissionais(id) ON DELETE CASCADE
        );
    `)
}

criarTabela().then()