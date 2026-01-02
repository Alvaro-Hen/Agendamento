window.addEventListener('load', () => {
    
    const butao = document.getElementById('btn-login')

    butao.addEventListener('click', async () => {
        e.preventDefault();
        const dados = {
            login: document.getElementById('email'),
            senha: document.getElementById('senha')
        };

        try{
            const resposta = await fetch('http://localhost:3000/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dados)
            })

            const resultado = await reposta.JSON

            if(resposta.ok){
                alert('Sucesso: ' + resultado.message)
            }else{
                alert('Erro: ' + resultado.message)
            }
        }catch(e){
            console.error("Erro na requisição: " + e)
            alert("Não foi possivel conectar ao servidor")
        }
    })
})