import { Router } from "express";
import { dbPromisse } from "../database/database.js";

router.get('/api/consultas', async (req, res) => {
    try {
        const db = await dbPromisse;
        
        const consultas = await db.all(`
            SELECT 
                c.id,
                c.data_consulta,
                c.hora_consulta,
                c.motivo,
                c.status,
                p.nome AS nome_paciente,
                p.cpf AS cpf_paciente,    -- ADICIONADO: Agora trazemos o CPF também
                m.nome AS nome_medico
            FROM Consultas c
            JOIN Pacientes p ON c.paciente_cpf = p.cpf
            JOIN Medicos m ON c.medico_id = m.id_profissional
            ORDER BY c.data_consulta, c.hora_consulta
        `);

        res.json(consultas);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao buscar consultas" });
    }
});