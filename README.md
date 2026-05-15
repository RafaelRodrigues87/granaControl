<div align="center">

# 💰 GranaControl

### Sistema de controle financeiro pessoal

![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.5-6DB33F?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker)

</div>

---

## 📋 Sobre o Projeto

O **GranaControl** é uma aplicação web de controle financeiro pessoal que permite gerenciar contas bancárias, receitas e despesas de forma simples e visual. Com dashboard interativo, gráficos de movimentações e metas de saldo personalizáveis.

---

## ✨ Funcionalidades

- 🔐 **Autenticação** com JWT — login e recuperação de senha por e-mail
- 🏦 **Contas** — cadastro, listagem e exclusão de contas bancárias
- 💚 **Receitas** — adicionar, editar e excluir entradas financeiras
- 🔴 **Despesas** — controle de gastos com status (Pendente/Pago)
- 📊 **Dashboard** — gráfico de receitas vs despesas nos últimos 30 dias
- 🎯 **Meta de saldo** — defina e acompanhe sua meta financeira
- 👤 **Perfil** — edição de dados pessoais

---

## 🛠️ Tecnologias

### Backend
| Tecnologia | Versão |
|---|---|
| Java | 21 |
| Spring Boot | 3.2.5 |
| Spring Security | JWT |
| Spring Data JPA | Hibernate |
| MySQL | 8.0 |
| JavaMailSender | Gmail SMTP |

### Frontend
| Tecnologia | Versão |
|---|---|
| React | 18 |
| Bootstrap | 5 |
| Recharts | - |
| Lucide React | - |
| Vite | - |

---
## 🚀 Como Rodar

### Pré-requisitos
- [Docker](https://www.docker.com/) e Docker Compose instalados
- [Node.js](https://nodejs.org/) 18+ instalado
- Conta Gmail com [senha de app](https://myaccount.google.com/security) gerada

### 1. Clone o repositório
```bash
git clone https://github.com/seuusuario/granacontrol.git
cd granacontrol
```

### 2. Suba o backend e banco com Docker
```bash
cd backend
docker-compose up -d
```

### 3. Configure o frontend
Crie o arquivo `.env` dentro de `frontend/granacontrol`:
```env
VITE_API_URL=http://localhost:8080
```

### 4. Rode o frontend
```bash
cd frontend/granacontrol
npm install
npm run dev
```

Frontend disponível em: **http://localhost:5173**
Backend disponível em: **http://localhost:8080**


## 🐳 Containers Docker

| Container | Imagem | Porta |
|---|---|---|
| `mysql-loja` | mysql:8.0 | 3306 |
| `backend-loja` | build local | 8080 |

### Comandos úteis

```bash
# Subir containers
docker-compose up -d

# Parar containers
docker-compose down

# Ver logs do backend
docker logs backend-loja -f

# Ver logs do banco
docker logs mysql-loja -f

# Rebuild após mudanças no backend
docker-compose up -d --build
```

---

## 📁 Estrutura do Projeto

granacontrol/
├── backend/
│   ├── src/
│   │   └── main/java/com/loja/loja/
│   │       ├── controller/
│   │       ├── entities/
│   │       ├── repository/
│   │       ├── service/
│   │       └── security/
│   ├── docker-compose.yml
│   ├── Dockerfile
│   └── pom.xml
│
└── frontend/
    └── granacontrol/
        ├── src/
        │   ├── components/
        │   ├── pages/
        │   └── service/
        └── package.json
---

## 🔌 Endpoints da API

### Autenticação
| Método | Rota | Descrição |
|---|---|---|
| POST | `/usuarios/cadastrar` | Cadastrar usuário |
| POST | `/usuarios/login` | Login |
| POST | `/usuarios/recuperar-senha` | Solicitar código de recuperação |
| POST | `/usuarios/verificar-codigo` | Redefinir senha |

### Usuário (🔒 autenticado)
| Método | Rota | Descrição |
|---|---|---|
| GET | `/usuarios/me` | Buscar usuário logado |
| PUT | `/usuarios/atualizar` | Atualizar perfil |

### Contas (🔒 autenticado)
| Método | Rota | Descrição |
|---|---|---|
| POST | `/usuarios/contas/criar` | Criar conta |
| GET | `/usuarios/contas/listar` | Listar contas |
| GET | `/usuarios/contas/saldo-total` | Saldo total |
| DELETE | `/usuarios/contas/deletar/{id}` | Deletar conta |

### Receitas (🔒 autenticado)
| Método | Rota | Descrição |
|---|---|---|
| POST | `/usuarios/receitas/adicionar/{contaId}` | Adicionar receita |
| GET | `/usuarios/receitas/listar` | Listar receitas |
| PUT | `/usuarios/receitas/atualizar/{id}` | Atualizar receita |
| DELETE | `/usuarios/receitas/deletar/{id}` | Deletar receita |

### Despesas (🔒 autenticado)
| Método | Rota | Descrição |
|---|---|---|
| POST | `/usuarios/despesas/criar/{contaId}` | Criar despesa |
| GET | `/usuarios/despesas/listar` | Listar despesas |
| PUT | `/usuarios/despesas/atualizar/{id}` | Atualizar despesa |
| DELETE | `/usuarios/despesas/deletar/{id}` | Deletar despesa |

### Movimentações (🔒 autenticado)
| Método | Rota | Descrição |
|---|---|---|
| GET | `/usuarios/movimentacoes/ultimas` | Últimas 3 movimentações |

---

## ⚠️ Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `JWT_SECRET` | Chave secreta do JWT | `MinhaChaveSecreta123` |
| `SPRING_DATASOURCE_URL` | URL do banco de dados | `jdbc:mysql://mysql:3306/mydb` |
| `SPRING_DATASOURCE_USERNAME` | Usuário do banco | `root` |
| `SPRING_DATASOURCE_PASSWORD` | Senha do banco | `123` |
| `MAIL_USERNAME` | E-mail Gmail | `email@gmail.com` |
| `MAIL_PASSWORD` | Senha de app Gmail | `abcd efgh ijkl mnop` |
| `VITE_API_URL` | URL do backend | `http://localhost:8080` |

> ⚠️ **Nunca suba o `.env` para o repositório!** Adicione ao `.gitignore`.

---

## 🔒 Segurança

- Senhas criptografadas com **BCrypt**
- Autenticação via **JWT** com expiração de 1 hora
- Rotas protegidas por filtro JWT
- Recuperação de senha com código de 6 dígitos e validade de 15 minutos
- Validação de propriedade de conta por usuário

---

## 👨‍💻 Autor

**Rafael Rodrigues**

---

<div align="center">
  Feito com ☕ e muito código
</div>
