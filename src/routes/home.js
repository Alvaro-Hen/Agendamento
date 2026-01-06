import { Router } from "express";
import { dbPromisse } from "../database/database.js";

export const home = Router();

home.get('/api/home', async  (req,res) => {
    try {
        const db = await dbPromisse

        const listarPacientes = await db.all("SELECT nome, cpf, dataNasc FROM Pacientes ORDER BY dataCadastro DESC LIMIT 10;" )

        return res.status(200).json(listarPacientes)
        

    } catch (error) {
        console.log("Erro ao buscar dados dos pacientes: ", error)
        return res.status(500).json({error: "Erro ao Buscar dados dos pacientes"})
        
    }
})

