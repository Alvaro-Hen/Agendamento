import { dbPromisse } from "./database.js";

const db = await dbPromisse
await db.get("PRAGMA foreign_keys = ON");

db.all(`INSERT INTO Profissionais(id,login,senha,cargo) VALUES(?,?,?,?)`, ["1","admin","admin","ADM"])

//db.run(`INSERT INTO Profissionais(id,login,senha,cargo) VALUES(?,?,?,?)`, [5,"asgas","Senha","Medico"])
//db.run(`INSERT INTO MEDICOS(id_profissional,rg,nome,especialidade,tel1,tel2,status) VALUES(?,?,?,?,?,?,?)`, [5,"21421512","Doidin","Cuidador","124521","23532","Ativo"])
//db.run(`DELETE FROM Profissionais`)
