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

### 2. Configure as variáveis de ambiente do backend

Crie um arquivo `.env` na raiz do projeto ou edite diretamente o `docker-compose.yml`:

```env
JWT_SECRET=SuaChaveSecretaAqui
SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/mydb?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=123
MAIL_USERNAME=seuemail@gmail.com
MAIL_PASSWORD=suasenhadaapp
```

### 3. Suba o backend e banco com Docker

```bash
docker-compose up -d
```

Aguarde os containers subirem. Verifique com:

```bash
docker ps
```

Você verá dois containers rodando:
- `mysql-loja` na porta `3306`
- `backend-loja` na porta `8080`

### 4. Configure o frontend

Crie o arquivo `.env` dentro da pasta `frontend/granacontrol`:

```env
VITE_API_URL=http://localhost:8080
```

### 5. Instale as dependências e rode o frontend

```bash
cd frontend/granacontrol
npm install
npm run dev
```

O frontend estará disponível em: **http://localhost:5173**

---

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
