window.addEventListener("load", async () => {
        listarPacientesRecentes();
        listarMedicosdoDia();
    })
    
    async function listarPacientesRecentes() {
    
        try{
            const resposta = await fetch('/api/Pacientes');
            const listaDePacientes = await resposta.json();
            
            const tbody  = document.getElementById('listarPacientes')
            tbody.innerHTML = "";


            listaDePacientes.forEach((element, index) => {
                const tr = document.createElement("li")
                tr.innerHTML = `
                    <li class="item">
                        <div class="item-icone"><i class="fas fa-user-injured"></i></div>
                        <div class="item-detalhes">
                            <strong>${element.nome}</strong>
                            <span>CPF: ${element.cpf}</span>
                            <span>Data de Nascimento: ${element.dataNasc}</span>
                        </div>
                    </li>
        
                `;
                tbody.appendChild(tr);
            });
        }catch(erro){
            console.error("Erro ao mostrar elemento na tela ", erro)
        } 
    }
