import { Router } from "express";
import { dbPromisse } from "../database/database.js";

export const login = Router();

login.post('/gui/login', async (req, res) => {
    const {login, senha} = req.body

    const db = await dbPromisse

    const usu = db.all('SELECT * FROM Adm WHERE login = ?', [login])

    if(!usu){
        return res.status(401).send('Usuario nao encontrado')
    }

    if(usu.senha === senha){
        res.send('Login realizado')
    }else{
        res.status(401).send('Senha incorreta')
    }
})