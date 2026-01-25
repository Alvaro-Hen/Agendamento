window.addEventListener("load", main)

function main(){
    
    const botao = document.getElementById('btn-cadastrar')
    const nome = document.getElementById('nome');
    const cpf = document.getElementById('cpf');
    const dataNasc = document.getElementById('dataNascimento');
    const tel1 = document.getElementById('telefone');
    const tel2 = document.getElementById('telefone2');
    
    botao.addEventListener('click', async (event) => {
        event.preventDefault();
        const dados = {
            nome: nome.value,
            cpf: cpf.value,
            dataNasc: dataNasc.value,
            tel1: tel1.value,
            tel2: tel2.value
        };
        const token = localStorage.getItem('meuToken')

        try {
            const resposta = await fetch('http://localhost:3000/gui/cadastrarPacientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(dados)
            });

            const resultado = await resposta.json();

            if (resposta.ok) {
                alert("Sucesso: " + resultado.message);

                nome.value = ""
                cpf.value = ""
                dataNasc.value = ""
                tel1.value = ""
                tel2.value = ""
            } else {
                alert("Erro: " + resultado.error);
            }
        } catch (erro) {
            console.error("Erro na requisição:", erro);
            alert("Não foi possível conectar ao servidor.");
        }
        
    });
}
