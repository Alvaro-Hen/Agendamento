window.addEventListener("load", async () => {
    try{
        const resposta = await fetch('/api/consultas');
        const listaDeConsultas = await resposta.json();
        
        const tbody  = document.getElementById('listarConsultas')
        tbody.innerHTML = "";


        listaDeConsultas.forEach((element, index) => {
            let dataFormatada = element.data_consulta.replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$3/$2/$1");
            const tr = document.createElement("tr")
             tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${dataFormatada} ás ${element.hora_consulta}</td>
                <td>${element.nome_paciente}</td>
                <td>${element.cpf_paciente}</td>
                <td>${element.nome_medico}</td>
                <td>${element.motivo}</td>
                <td>${element.status}</td>
            `;
            tbody.appendChild(tr);
        });
    }catch(erro){
        console.error("Erro ao mostrar elemento na tela ", erro)
    } 
})
