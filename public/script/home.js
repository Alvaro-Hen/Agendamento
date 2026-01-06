window.addEventListener("load", async () => {
        listarPacientesRecentes();
        listarMedicosdoDia();
    })
    
    async function listarPacientesRecentes() {
    
        try{
            const resposta = await fetch('/api/Pacientes');
            const listaDePacientesRecentes = await resposta.json();
            
            const lista  = document.getElementById('listarPacientes')
            lista.innerHTML = "";


            listaDePacientesRecentes.forEach((element, index) => {
                const li = document.createElement("li")
                li.innerHTML = `
                    <li class="item">
                        <div class="item-icone"><i class="fas fa-user-injured"></i></div>
                        <div class="item-detalhes">
                            <strong>${element.nome}</strong>
                            <span>CPF: ${element.cpf}</span>
                            <span>Data de Nascimento: ${element.dataNasc}</span>
                        </div>
                    </li>
        
                `;
                lista.appendChild(li);
            });
        }catch(erro){
            console.error("Erro ao mostrar elemento na tela ", erro)
        } 
    }

    async function listarMedicosdoDia() {

        try {
            const resposta = await fetch('/api/Profissionais')
            const listarMedicosdoDia = await resposta.json();

            const listaM = document.getElementById('listarMedicos')
            listaM.innerHTML = "";

            listarMedicosdoDia.forEach((element,index) => {
                const li = document.createElement("li")
                li.innerHTML = `
                <li class="item">
                    <div class="item-icone">
                        <img src="/img/image 9.png" alt="Icone de Médico">
                    </div>
                    <div class="item-detalhes">
                        <strong>Dr: ${element.login}</strong>
                        <span>CRM: ${element.senha}</span>
                        <span>Especialidade: ${element.cargo}</span>
                    </div>
                </li>

                `;
                listaM.appendChild(li);
            });
        } catch (error) {
            console.error("Erro ao mostrar elemento na tela".erro)
        }
        
    }
