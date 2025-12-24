import { Router } from "express"
import { dbPromisse } from "../database/database.js";

export const cadastrarPacientes = Router()

cadastrarPacientes.post('/gui/cadastrarPacientes', async (req, res) => {
    const { nome, cpf, dataNasc, tel1, tel2 } = req.body;

    const db = await dbPromisse
    await db.run(`
        INSERT INTO Pacientes (
        nome,
        cpf,
        dataNasc,
        tel1,
        tel2
        ) VALUES (?,?,?,?,?)`,
        [
            nome,
            cpf,
            dataNasc,
            tel1,
            tel2
        ]
        )

    return res.status(201).json({
        message: "Paciente cadastrado com sucesso",
        data: {nome, cpf}
    })
})
