window.addEventListener('load', async () => {
    const pesquisa = document.getElementById("buscar")
    const botaoMedico = document.getElementById("medico")
    const botaoFuncionario = document.getElementById("funcionario")
    const tabela = document.getElementById('listarPacientes')
    const pop = document.getElementById("formModal")
    const popClose = document.getElementById("closeModal")
    let listaProfissionais = [];

    try{
        const resposta = await fetch('/api/profissionais');
        listaProfissionais = await resposta.json();
        renderizarLista(listaProfissionais)
    }catch(e){
        alert('Erro: ' + e)
    };

    pesquisa.addEventListener('input', (e) => {
        tabela.innerHTML = "";
        const listaPesquisa = listaProfissionais.filter(item => {
            return item.login.toLowerCase().includes(e.target.value.toLowerCase())
        })
        renderizarLista(listaPesquisa)
    });

    botaoMedico.addEventListener("click", () => {
        pop.showModal()
    })

    popClose.addEventListener("click", () => {
        pop.close()
    })

    pop.addEventListener("click", (e) => {
        const dialogDimensions = pop.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            pop.close();
        }
    })

    function renderizarLista(lista){
        tabela.innerHTML = "";
        lista.forEach((element, index) => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${element.id}</td>
                <td>${element.login}</td>
                <td>${element.cargo}</td>
            `;
            tabela.appendChild(tr);
        });
    };
    
})
