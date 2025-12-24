import express from "express"
import path from "path"
import { cadastrarPacientes } from "./src/routes/cadastrarPacientes.js"
import { listarPacientes } from "./src/routes/listarPacientes.js"

const app = express()

app.use(express.json())
app.use(express.static('public/'))
app.use(cadastrarPacientes)
app.use(listarPacientes)

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/Gui/login.html'));
})

app.listen(3000, () => {console.log("Aplicação executando na porta 3000...")})
