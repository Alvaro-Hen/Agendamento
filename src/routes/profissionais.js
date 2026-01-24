import { Router } from "express";
import { dbPromisse } from "../database/database.js"

export const profissionais = Router()

profissionais.get('/api/profissionais', async (req, res) => {
    try{
        const db = await dbPromisse
        const listaProfissionais = await db.all("SELECT * FROM Profissionais ORDER BY login")
        return res.status(200).json(listaProfissionais)
    }catch(erro){
        console.error("Erro ao listar: ", erro)
        return res.status(500).json({Erro: "Erro ao buscar os dados dos profissionais"})
    }
})


profissionais.post('/gui/cadastrarMedico', async (req, res) => {
    try {
        const { nome, especialidade, tel, crm } = req.body;
        const senhaPadrao = "12345"; 

        if (!nome || !especialidade || !crm) {
            return res.status(400).json({ erro: "Preencha Nome, CRM e Especialidade!" });
        }

        const db = await dbPromisse;

        
        const resultadoProfissional = await db.run(`
            INSERT INTO Profissionais (login, senha, cargo)
            VALUES (?, ?, 'Medico')
        `, [crm, senhaPadrao]);

        const idProfissional = resultadoProfissional.lastID;

        
        await db.run(`
            INSERT INTO Medicos (id_profissional, crm, nome, especialidade, tel1, status)
            VALUES (?, ?, ?, ?, ?, 'Ativo')
        `, [idProfissional, crm, nome, especialidade, tel]);

        return res.status(201).json({ 
            mensagem: `Médico cadastrado! Login: ${crm}` 
        });

    } catch (erro) {
        console.error(erro);
        if (erro.message && erro.message.includes('UNIQUE')) {
            return res.status(400).json({ erro: "Este CRM já possui cadastro." });
        }
        return res.status(500).json({ erro: "Erro interno ao cadastrar médico." });
    }
});


profissionais.post('/gui/cadastrarFuncionario', async (req, res) => {
    try {
        
        const { nome, rg } = req.body; 
        const senhaPadrao = "12345";

        if (!rg) {
            return res.status(400).json({ erro: "O RG (Login) é obrigatório!" });
        }

        const db = await dbPromisse;

        await db.run(`
            INSERT INTO Profissionais (login, senha, cargo) 
            VALUES (?, ?, 'ADM')
        `, [rg, senhaPadrao]);

        return res.status(201).json({ mensagem: `Funcionário cadastrado! Login: ${rg}` });

    } catch (erro) {
        if (erro.message && erro.message.includes('UNIQUE')) {
            return res.status(400).json({ erro: "RG/Login já cadastrado." });
        }
        return res.status(500).json({ erro: "Erro ao cadastrar funcionário." });
    }
});