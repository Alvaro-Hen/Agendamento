import { open } from "sqlite";
import sqlite3 from "sqlite3";

export const dbPromisse = open ({
    filename: "./src/database/Agenda.db",
    driver: sqlite3.Database,
});

async function criarTabela() {
    const db = await dbPromisse;
    await db.run("PRAGMA foreign_keys = ON");
    
    await db.exec(`
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
            id_profissional INTEGER PRIMARY KEY,
            crm TEXT UNIQUE, 
            nome TEXT,
            especialidade TEXT,
            tel1 TEXT,
            tel2 TEXT,
            status TEXT,
            FOREIGN KEY(id_profissional) REFERENCES Profissionais(id) ON DELETE CASCADE
        );

        
        CREATE TABLE IF NOT EXISTS Funcionarios (
            id_profissional INTEGER PRIMARY KEY,
            nome TEXT,
            rg TEXT UNIQUE,
            tel TEXT,
            FOREIGN KEY(id_profissional) REFERENCES Profissionais(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS Consultas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            paciente_cpf TEXT,
            medico_id INTEGER,
            data_consulta TEXT,
            hora_consulta TEXT,
            motivo TEXT,
            observacoes TEXT,
            status TEXT DEFAULT 'Agendado',
            FOREIGN KEY (paciente_cpf) REFERENCES Pacientes(cpf),
            FOREIGN KEY (medico_id) REFERENCES Profissionais(id)
        );
    `)
}

criarTabela().then(() => console.log("Tabelas criadas com sucesso!"));