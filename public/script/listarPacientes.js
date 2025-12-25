window.addEventListener("load", async () => {
    try{
        const resposta = await fetch('/api/pacientes');
        const listaDePacientes = await resposta.json();
        
        const tbody  = document.getElementById('listarPacientes')
        tbody.innerHTML = ""; // limpa antes de renderizar


        listaDePacientes.forEach((element, index) => {
            const tr = document.createElement("tr")
             tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${element.nome}</td>
                <td>${element.cpf}</td>
            `;

            tbody.appendChild(tr);
        });
    }catch(erro){
        console.error("Erro ao mostrar elemento na tela ", erro)
    } 
})
