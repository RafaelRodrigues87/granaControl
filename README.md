GranaControl 💰

Sistema de controle financeiro desenvolvido com foco em gerenciamento de receitas, despesas e contas bancárias, oferecendo uma experiência moderna e organizada para acompanhamento financeiro pessoal.

📌 Sobre o Projeto

O GranaControl foi criado com o objetivo de praticar e consolidar conhecimentos em desenvolvimento backend, construção de APIs REST e integração com frontend moderno.

A aplicação permite que usuários gerenciem suas movimentações financeiras de forma prática, mantendo controle sobre:

receitas
despesas
contas bancárias
saldo total
histórico de movimentações

O projeto também possui autenticação segura e controle de acesso utilizando JWT.

🚀 Funcionalidades
👤 Usuários
Cadastro de usuários
Login autenticado
Proteção de rotas
Controle de sessão
💵 Receitas
Cadastro de receitas
Atualização de receitas
Exclusão de receitas

💸 Despesas
Cadastro de despesas
Atualização de despesas
Exclusão de despesas
Controle entre despesas pagas e pendentes
🏦 Contas
Cadastro de contas bancárias
Controle de saldo automático
Identificação da conta com maior saldo
📊 Dashboard
Últimas movimentações
Saldo total
Conta principal
Gráfico financeiro
Resumo financeiro do usuário
🧠 Regras de Negócio

O sistema possui regras implementadas para manter a integridade financeira dos dados:

Atualização automática do saldo das contas
Controle de despesas pagas e pendentes
Relacionamento entre movimentações e contas
Validação de autenticação do usuário
Controle de acesso às informações do usuário logado
🏗️ Arquitetura do Projeto

O backend foi estruturado seguindo arquitetura em camadas:

controller
service
repository
entity
security
config

Essa estrutura facilita:

manutenção
escalabilidade
organização do código
separação de responsabilidades
🔐 Segurança

A aplicação utiliza autenticação baseada em JWT (JSON Web Token), garantindo maior segurança no acesso às rotas protegidas.

Recursos implementados:

autenticação de usuários
autorização de rotas
validação de token
expiração automática de sessão
proteção contra acesso não autorizado
🎨 Frontend

O frontend foi desenvolvido com foco em:

interface moderna
experiência do usuário
visual inspirado em dashboards financeiros

📈 Objetivos do Projeto

Este projeto foi desenvolvido para aprofundar conhecimentos em:

desenvolvimento backend
APIs REST
autenticação JWT
regras de negócio
integração frontend/backend
arquitetura de aplicações
persistência de dados
