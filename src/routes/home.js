import { Router } from "express";
import { dbPromisse } from "../database/database.js";

export const home = Router();

home.get('/api/home', async  (req,res) => {
    try {
        const db = await dbPromisse

        const listarPacientesRecentes = await db.all("SELECT nome, cpf, dataNasc FROM Pacientes ORDER BY dataCadastro DESC LIMIT 10;" );
        const listarMedicosdoDia = await db.all("SELECT login, senha, cargo FROM Profissionais" );

        return res.status(200).json({listarPacientesRecentes,listarMedicosdoDia});
        

    } catch (error) {
        console.log("Erro ao buscar dados dos pacientes: ", error)
        return res.status(500).json({error: "Erro ao Buscar dados da home"})
        
    }
})




