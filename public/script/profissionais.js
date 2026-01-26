window.addEventListener('load', async () => {
    const tabela = document.getElementById('listarProfissionais'); 
    const inputBusca = document.getElementById("buscar");
    const btnAbrirMedico = document.getElementById("medico");
    const btnAbrirFuncionario = document.getElementById("funcionario");
    const modal = document.getElementById("formModal");
    const btnFechar = document.getElementById("closeModal");
    const form = document.getElementById("formCadastro");
    
   
    const labelLogin = document.getElementById('labelLogin') || document.querySelector('label[for="crm"]');
    const containerEspecialidade = document.getElementById('container-especialidade');
    
    let tipoCadastro = ""; 

   
    async function atualizarTabela() {
        if(!tabela) return; 
        try {
            const resposta = await fetch('/api/profissionais');
            const lista = await resposta.json();
            
            tabela.innerHTML = "";
            lista.forEach((prof, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${prof.id}</td>
                    <td>${prof.login}</td> 
                    <td>${prof.cargo}</td>
                `;
                tabela.appendChild(tr);
            });
        } catch(e) {
            console.error(e);
        }
    }

  
    
    if(btnAbrirMedico) {
        btnAbrirMedico.addEventListener("click", () => {
            tipoCadastro = "medico";
            let h2 = document.getElementById('tipo')
            h2.textContent = 'Cadastro de Médico'
            
            if(labelLogin) labelLogin.innerText = "CRM (Login)";
            if(containerEspecialidade) containerEspecialidade.style.display = "block"; 
            
            const inputEsp = document.getElementById('especialidade');
            if(inputEsp) inputEsp.required = true;

            modal.showModal();
        });
    }

    if(btnAbrirFuncionario) {
        btnAbrirFuncionario.addEventListener("click", () => {
            tipoCadastro = "funcionario";
            let h2 = document.getElementById('tipo')
            h2.textContent = 'Cadastro de Recepcionista'
            
            if(labelLogin) labelLogin.innerText = "CPF (Login)";
            if(containerEspecialidade) containerEspecialidade.style.display = "none"; 
            
            const inputEsp = document.getElementById('especialidade');
            if(inputEsp) inputEsp.required = false;

            modal.showModal();
        });
    }

    if(btnFechar) {
        btnFechar.addEventListener("click", () => {
            modal.close();
            form.reset();
        });
    }

    
    if(form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const docLogin = document.getElementById('crm').value; 
            const nome = document.getElementById('nome').value;
            const tel = document.getElementById('tel1').value;
            const inputEsp = document.getElementById('especialidade');
            const especialidade = inputEsp ? inputEsp.value : "";

            let url = "";
            let dados = {};

            if (tipoCadastro === "medico") {
                url = "/gui/cadastrarMedico";
                dados = { nome, tel, crm: docLogin, especialidade };
            } else {
                url = "/gui/cadastrarFuncionario";
                dados = { nome, tel, rg: docLogin };
            }

            try {
                const resposta = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                });
                const resultado = await resposta.json();

                if (resposta.ok) {
                    alert("Sucesso " + resultado.mensagem);
                    modal.close();
                    form.reset();
                    atualizarTabela();
                } else {
                    alert("Erro: " + resultado.erro);
                }
            } catch (erro) {
                console.error(erro);
                alert("Erro de conexão.");
            }
        });
    }

    await atualizarTabela();
});