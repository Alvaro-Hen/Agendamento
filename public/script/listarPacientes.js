window.addEventListener("load", async () => {
    try{
        const resposta = await fetch('/api/pacientes');
        const listaDePacientes = await resposta.json();
        renderizarLista(listaDePacientes)
        
    }catch(erro){
        console.error("Erro ao mostrar elemento na tela ", erro)
    }

    function renderizarLista(lista){
        const tbody  = document.getElementById('listarPacientes')
        tbody.innerHTML = "";


        lista.forEach((element, index) => {
            const tr = document.createElement("tr")
             tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${element.nome}</td>
                <td>${element.cpf}</td>
                <td>${element.dataNasc}</td>
                <td>${element.tel1}</td>
                <td>${element.tel2}</td>
            `;
            tbody.appendChild(tr);
        });
    }
})
