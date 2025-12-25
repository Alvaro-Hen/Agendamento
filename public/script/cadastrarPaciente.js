window.addEventListener("load", main)

function main(){
    
    const botao = document.getElementById('btn-agendar')
    
    botao.addEventListener('click', async () => {
        event.preventDefault();
        const dados = {
            nome: document.getElementById('nome').value,
            cpf: document.getElementById('cpf').value,
            dataNasc: document.getElementById('data').value,
            tel1: document.getElementById('telefone').value,
            tel2: document.getElementById('telefone2').value,
        };

        try {
            const resposta = await fetch('http://localhost:3000/gui/cadastrarPacientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            const resultado = await resposta.json();

            if (resposta.ok) {
                alert("Sucesso: " + resultado.message);
            } else {
                alert("Erro: " + resultado.error);
            }
        } catch (erro) {
            console.error("Erro na requisição:", erro);
            alert("Não foi possível conectar ao servidor.");
        }
        nome.value = ""
        cpf.value = ""
        dataNasc.value = ""
        tel1.value = ""
        tel2.value = ""
    });
}
