import { Router } from "express";
import { dbPromisse } from "../database/database.js"

export const profissionais = Router()

profissionais.get('/api/profissionais', async (req, res) => {
    try{
        const db = await dbPromisse

        const listaProfissionais = await db.all("SELECT * FROM Profissionais ORDER BY login")

        return res.status(200).json(listaProfissionais)
    }catch(e){
        console.error("Erro ao listar: ", erro)
        return res.status(500).json({Erro: "Erro ao buscar os dados dos profissionais"})
    }
})