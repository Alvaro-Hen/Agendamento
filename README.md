# Agendamento
🏥 Agendamento – Projeto IFPE
O Agendamento é um projeto desenvolvido para a disciplina de WEB do IFPE. Iniciando o projeto enquanto aprendemos, ele utiliza atualmente SQLite e foca nas páginas de administração. O objetivo é migrar para PostgreSQL e expandir as funcionalidades para perfis de Funcionários e Médicos ao decorrer do curso.

🚀 Funcionalidades
🔐 Autenticação e Segurança
Login de Profissionais: Acesso restrito via login e senha.

Gestão de Sessão: Implementação de persistência via tokens ativos armazenados no banco de dados e no navegador do usuário.


Logout Seguro: Encerramento de sessão com redirecionamento para a página de login.

👥 Gestão de Pacientes
Cadastro de Pacientes: Registro completo com Nome, CPF, Data de Nascimento e múltiplos contatos.

Validação de Dados: Backend robusto com validação de Regex para nomes e sanitização de CPF (apenas números).

Listagem Dinâmica: Tabela de pacientes ordenada alfabeticamente para facilitar a consulta.

🩺 Gestão de Profissionais e Médicos
Cadastro Multi-nível: Separação entre dados de login (Profissionais) e dados clínicos (Médicos).

Especialidades: Registro de Registro Geral (RG) e Especialidade médica para organização da escala.

Filtro de Busca: Localização rápida de profissionais através de barra de busca integrada.

📊 Dashboard Administrativo
Painel de Controle: Exibição centralizada com médicos do dia e pacientes recentes.

Status de Consultas: Visualização rápida de atendimentos agendados, finalizados ou cancelados.

🛠️ Tecnologias Utilizadas

Frontend: HTML5, CSS3, JavaScript (ES6+) e FontAwesome.

Backend: Node.js com Framework Express.

Banco de Dados: SQLite3 com suporte a chaves estrangeiras (FOREIGN KEYS).

Persistência: localStorage para tokens de autenticação.

📂 Estrutura Principal do Projeto
Plaintext
/src
  /database
    - Agenda.db        # Banco de dados relacional
    - database.js      # Script de criação de tabelas
    - seed.js          # Popular dados iniciais
  /gui                 # Rotas da API (Backend)
    - cadastrarPacientes.js
    - home.js
    - login.js
  /script              # Lógica do Front-end
    - home.js
    - listarPacientes.js
/public
  /Style               # Arquivos CSS (Sidebar, Header, Index)
  /img                 # Assets e Imagens
  - home.html          # Páginas Principais
  - login.html
  - cadastrarPacientes.html
🗄️ Modelo de Dados (Database)
O sistema utiliza uma estrutura relacional otimizada para garantir a integridade dos dados:

Tabela Pacientes: Chave primária baseada no CPF para evitar duplicidade.

Tabela Profissionais: Gerencia o acesso ao sistema (Login, Senha, Cargo).

Tabela Medicos: Vinculada à tabela de Profissionais via ON DELETE CASCADE.

Tabela TokensAtivos: Controla quem está autenticado no momento.

💡 Aprendizados Reforçados
Durante o desenvolvimento deste projeto, a equipe pôde aprofundar conhecimentos em:

Arquitetura REST: Criação de rotas e manipulação de métodos HTTP (GET/POST).

Integridade de Dados: Uso de Chaves Estrangeiras para relacionar médicos e usuários.

Segurança Básica: Sanitização de inputs para evitar dados inconsistentes no banco.


Componentização CSS: Criação de um layout de Dashboard reutilizável com Sidebar e Header.