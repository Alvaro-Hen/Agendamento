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
        const resposta = await fetch('/api/consultas');
        const consultas = await resposta.json();

        const listaM = document.getElementById('listarMedicos');
        listaM.innerHTML = "";

        const hoje = dayjs().format('YYYY-MM-DD');

        consultas.forEach((element) => {
            if (element.data_consulta === hoje) {
                const li = document.createElement("li");
                
                li.className = "item"; 
                li.innerHTML = `
                    <div class="item-icone">
                        <img src="/img/image 9.png" alt="Icone de Médico">
                    </div>
                    <div class="item-detalhes">
                        <strong>Dr: ${element.nome_medico}</strong>
                        <span>CRM: ${element.crm}</span> 
                        <span>Especialidade: ${element.especialidade}</span>
                    </div>
                `;
                listaM.appendChild(li);

            }
           
        });
    } catch (error) {
        console.error("Erro ao carregar médicos do dia:", error);
    }
}
