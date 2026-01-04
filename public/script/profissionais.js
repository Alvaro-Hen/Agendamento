window.addEventListener('load', async () => {
    try{
        const resposta = await fetch('/api/profissionais');
        const listaProfissionais = await resposta.json();

        const lista = document.getElementById('listarPacientes')
        lista.innerHTML = "";

        listaProfissionais.forEach((element, index) => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${element.id}</td>
                <td>${element.login}</td>
                <td>${element.cargo}</td>
            `;
            lista.appendChild(tr);
        });
    }catch(e){
        alert('Erro: ' + e)
    }
})
