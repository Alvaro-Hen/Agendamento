let listaDePacientesRecentes

window.addEventListener("load", async () => {
        listarPacientesRecentes();
        listarMedicosdoDia();
        listarConsultasdoDia();
        const listaAtual = document.getElementById("listarPacientes")
        const buscar = document.getElementById("Buscar")
        buscar.addEventListener("input", (e) => {
            listaAtual.innerHTML = "";
            const listaPesquisa = listaDePacientesRecentes.filter(item => {
                return item.cpf.toLowerCase().includes(e.target.value.toLowerCase())
            })
            renderizarLista(listaPesquisa)
        })
})
    
    async function listarPacientesRecentes() {

        try{
            const resposta = await fetch('/api/Pacientes');
            listaDePacientesRecentes = await resposta.json();
            renderizarLista(listaDePacientesRecentes)
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

    async function listarConsultasdoDia() {
        try{
            const resposta = await fetch('/api/consultas');
            const consultas = await resposta.json();

            const listaC = document.getElementById('lista-consultas');
            const divCartao = document.getElementById('card-detalhes')
                listaC.innerHTML = "";

                consultas.forEach((element) => {
                    const li = document.createElement("li");
                        
                    li.className = "item"; 
                    li.innerHTML = `
                        <div class="item-detalhes">
                            <strong>ID: ${element.id}</strong>
                            <span>Status: ${element.status}</span> 
                            <span>Motivo: ${element.motivo}</span>
                        </div>
                    `;
                    listaC.appendChild(li);
                    divCartao.appendChild(listaC)
            });
        }
        catch(e){
            console.log(e)
        }
        
    }

    function renderizarLista(lista){
        const listaAtual = document.getElementById("listarPacientes")
        listaAtual.innerHTML = "";

            lista.forEach((element, index) => {
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
                listaAtual.appendChild(li);
            });
        
    };
    
