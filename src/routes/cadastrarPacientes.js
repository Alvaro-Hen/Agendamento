import { Router } from "express"
import { dbPromisse } from "../database/database.js";
import dayjs from "dayjs";

export const cadastrarPacientes = Router()

cadastrarPacientes.post('/gui/cadastrarPacientes', async (req, res) => {
    try{
        const nome = req.body.nome?.trim()
        const cpf = req.body.cpf?.trim()
        const {dataNasc, tel1, tel2} = req.body;
        
        if(!nome || !cpf || !dataNasc || !tel1){
            return res.status(400).json({
                erro: "Campos obrigatórios: nome, cpf, data de nascimento e telefone principal"
            })
        }

        const nomeValido = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nome)
        if(!nomeValido){
            return res.status(400).json({
                erro: "O nome deve ter apenas letras"
            })
        }

        const cpfLimpo = cpf.replace(/\D/g, '');
        if (cpfLimpo.length !== 11) {
            return res.status(400).json({ erro: "CPF inválido" });
        }

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
    } catch(e){
        if (e.message && e.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ erro: "Este CPF já está cadastrado!" });
        }else{
        return res.status(500).json({ erro: "Erro interno no servidor ao cadastrar paciente." });}
    }
})

cadastrarPacientes.get('/api/pacientes', async (req, res) => {
    try {
        const db = await dbPromisse;
        const pacientes = await db.all("SELECT nome, cpf FROM Pacientes");
        res.json(pacientes);
    } catch (e) {
        
        console.error(e);
        res.status(500).json({ erro: "Erro ao buscar lista de pacientes" });
    }
});
