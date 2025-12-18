import express from "express"
import path from "path"

const app = express()


app.use(express.json())
app.use(express.static('public/'))

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public/Gui/login.html'));
})

app.listen(3000, funcaoIniciar)

function funcaoIniciar() {
    console.log("Aplicação executando na porta 3000...")
}
