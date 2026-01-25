import { Router } from "express";
import { dbPromisse } from "../database/database.js";

export const agendarConsulta = Router();


agendarConsulta.get('/buscar/medicos', async (req, res) => {
    try {
        const db = await dbPromisse;
       
        const medicos = await db.all("SELECT id_profissional, nome, especialidade FROM Medicos WHERE status = 'Ativo'");
        res.json(medicos);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar médicos" });
    }
});


agendarConsulta.get('/api/pacientes', async (req, res) => {
    try {
        const db = await dbPromisse;
        const pacientes = await db.all("SELECT nome, cpf FROM Pacientes");
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar pacientes" });
    }
});


agendarConsulta.post('/agendar', async (req, res) => {
    try {
        const { cpf, medicoId, data, hora, motivo, observacoes } = req.body;

       
        if (!cpf || !medicoId || !data || !hora) {
            return res.status(400).json({ erro: "Erro: Dados incompletos. Verifique se escolheu Médico e Paciente da lista." });
        }

        const db = await dbPromisse;

        
        const paciente = await db.get("SELECT cpf FROM Pacientes WHERE cpf = ?", [cpf]);
        if (!paciente) {
            return res.status(404).json({ erro: "Paciente não encontrado. Verifique o CPF digitado." });
        }

     
        const conflito = await db.get(
            "SELECT id FROM Consultas WHERE medico_id = ? AND data_consulta = ? AND hora_consulta = ? AND status != 'Cancelado'",
            [medicoId, data, hora]
        );

        if (conflito) {
            return res.status(409).json({ erro: "Este médico já possui um agendamento neste horário!" });
        }

        
        await db.run(`
            INSERT INTO Consultas (
            paciente_cpf, 
            medico_id, 
            data_consulta, 
            hora_consulta, 
            motivo, 
            observacoes, 
            status)
            VALUES 
            (?, ?, ?, ?, ?, ?, 'Agendado')
        `, [cpf, medicoId, data, hora, motivo, observacoes]);

        res.status(201).json({ mensagem: "Consulta agendada com sucesso!" });

    } catch (erro) {
        console.error("Erro no agendamento:", erro);
        res.status(500).json({ erro: "Erro de conexão." });
    }
});