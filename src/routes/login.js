import { Router } from "express";
import { dbPromisse } from "../database/database.js";

export const login = Router();

login.post('/api/login', async (req, res) => {
    const {login, senha} = req.body

    const db = await dbPromisse

    const usu = await db.get('SELECT * FROM Profissionais WHERE login = ?', [login])

    if(!usu){
        return res.status(401).json({erro: 'Usuario não encontrado'})
    }
    
    if(usu.senha === senha){
        const token = Math.random().toString(8)
        await db.run("DELETE FROM TokensAtivos WHERE usuario_id = ?", [usu.id])
        await db.run("INSERT INTO TokensAtivos (token, usuario_id) VALUES (?,?)", [token, usu.id])
        return res.json({token: token})
    }else{
       return res.status(401).json({ erro: 'Senha incorreta' })
    }
})