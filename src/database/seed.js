import { dbPromisse } from "./database.js";

const db = await dbPromisse

//db.all(`INSERT INTO Profissionais(id,login,senha,cargo) VALUES(?,?,?,?)`, ["1","Batata","Senha","ADM"])

