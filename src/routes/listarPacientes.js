import { Router } from "express";
import { dbPromisse } from "../database/database.js";

export const listarPacientes = Router()

listarPacientes.get('/api/pacientes', async (req, res) => {
    try{
        const db = await dbPromisse

        const pacientes = await db.all('SELECT * FROM Pacientes ORDER BY nome')

        return res.status(200).json(pacientes)
    } catch(erro){
        console.error("Erro ao listar: ", erro)
        return res.status(500).json({erro: "Erro ao carregar os dados"})
    }
})