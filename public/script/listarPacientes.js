window.addEventListener("load", async () => {
    try{
        const resposta = await fetch('/api/pacientes');
        const listaDePacientes = await resposta.json();
        
        const div = document.getElementById('listarPacientes')
        const lista = document.createElement("ol")

        listaDePacientes.forEach(element => {
            const elementoLista = document.createElement("li")
            elementoLista.textContent = `Paciente: ${element.nome}, CPF: ${element.cpf}`
            lista.appendChild(elementoLista)
        });
        div.appendChild(lista)
    }catch(erro){
        console.error("Erro ao mostrar elemento na tela ", erro)
    } 
})
