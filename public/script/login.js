window.addEventListener("load", () => {
    
    const butao = document.getElementById('btn-login')

    butao.addEventListener('click', async (event) => {
        event.preventDefault();
        const dados = {
            login: document.getElementById('email').value,
            senha: document.getElementById('password').value
        };
        try{
            const resposta = await fetch('/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dados)
            })
            const resultado = await resposta.json();

            if(resultado.token){
                localStorage.setItem('meuToken', resultado.token)
                window.location.href = '/gui/home.html'
            }
        }catch(e){
            console.error("Erro na requisição: " + e)
            alert("Não foi possivel conectar ao servidor")
        }
    })
})