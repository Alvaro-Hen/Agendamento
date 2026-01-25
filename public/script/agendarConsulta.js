window.addEventListener("load", main);

function main() {
    const btnAgendar = document.getElementById('btn-agendar');
    const inputData = document.getElementById('data');
    const inputHora = document.getElementById('hora');
    const inputMotivo = document.getElementById('motivo');
    const inputObs = document.getElementById('observacoes');

    let todosMedicos = [];
    let todosPacientes = [];


    async function carregarDados() {
        try {
            const [resMed, resPac] = await Promise.all([
                fetch('/buscar/medicos'),
                fetch('/api/pacientes')
            ]);

            if (resMed.ok) todosMedicos = await resMed.json();
            if (resPac.ok) todosPacientes = await resPac.json();
            
        } catch (erro) {
            console.error("Erro ao baixar dados:", erro);
        }
    }
    carregarDados();

    function criarBusca(inputId, listaId, hiddenId, tipo) {
        const input = document.getElementById(inputId);
        const lista = document.getElementById(listaId);
        const hidden = document.getElementById(hiddenId);

        input.addEventListener('input', () => {
            const termo = input.value.toLowerCase();
            lista.innerHTML = '';
            hidden.value = ''; 

            if (termo === '') {
                lista.style.display = 'none';
                return;
            }

            let filtrados = [];
            
            if (tipo === 'medico') {
               
                filtrados = todosMedicos.filter(m => m.nome.toLowerCase().includes(termo));
            } else {
                
                filtrados = todosPacientes.filter(p => p.cpf.includes(termo));
            }

            if (filtrados.length > 0) {
                lista.style.display = 'block';
                
                filtrados.forEach(item => {
                    const li = document.createElement('li');
                    
                    if (tipo === 'medico') {
                        li.innerText = `Dr(a). ${item.nome}`;
                        li.onclick = () => {
                            input.value = item.nome; 
                            hidden.value = item.id_profissional; 
                            lista.style.display = 'none';
                        };
                    } else {
                       
                        li.innerText = `${item.cpf} - ${item.nome}`;
                        
                        li.onclick = () => {
                            
                            input.value = item.cpf;  
                            hidden.value = item.cpf;
                            lista.style.display = 'none';
                        };
                    }
                    lista.appendChild(li);
                });
            } else {
                lista.style.display = 'none';
            }
        });

       
        document.addEventListener('click', (e) => {
            if (e.target !== input) lista.style.display = 'none';
        });
    }

   
    criarBusca('buscaMedico', 'lista-medicos', 'idMedicoReal', 'medico');
    criarBusca('buscaPaciente', 'lista-pacientes', 'cpfPacienteReal', 'paciente');

    
    btnAgendar.addEventListener('click', async (e) => {
        e.preventDefault();

        const idMedico = document.getElementById('idMedicoReal').value;
        const cpfPaciente = document.getElementById('cpfPacienteReal').value;

        if (!idMedico || !cpfPaciente || !inputData.value || !inputHora.value) {
            alert("Selecione um Médico e um Paciente da lista!");
            return;
        }

        const dados = {
            medicoId: idMedico,
            cpf: cpfPaciente,
            data: inputData.value,
            hora: inputHora.value,
            motivo: inputMotivo.value,
            observacoes: inputObs.value
        };

        try {
            const req = await fetch('/agendar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
            const res = await req.json();

            if (req.ok) {
                alert("Sucesso, Consulta agendada " + res.mensagem);
                location.reload();
            } else {
                alert("Erro em agendar Consulta" + res.erro);
            }
        } catch (erro) {
            console.error(erro);
            alert("Erro de conexão.");
        }
    });
}