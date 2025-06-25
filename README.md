
# Aplicação Fullstack - Chat App

Aplicação fullstack de chat em tempo real utilizando **Node.js (NestJS)** no backend, **Vue.js** no frontend, **MySQL**, **Redis** e **WebSocket**, containerizada com **Docker**.

## 🧱 Estrutura do Projeto

```
chat-app/
├── backend/
├── frontend/
├── docker-compose.yml
└── README.md
```

## 🚀 Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (recomendado apenas se for rodar localmente sem Docker)

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/LauroRafael/chat-app.git
cd chat-app
```

**Instale as dependências do backend:**
```bash
cd backend
npm install
```

**Instale as dependências do frontend:**
```bash
cd ../frontend
npm install
```

**Volte para a raiz do projeto:**
```bash
cd ..
```

## 🐳 Subindo com Docker

Após instalar as dependências, execute o seguinte comando na raiz do projeto:

```bash
docker-compose up -d --build
```

Isso irá:

- Criar e subir os containers do backend, frontend, banco de dados MySQL e Redis.
- Expor as portas conforme definidas no `docker-compose.yml`.

## 🌐 Acessos

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api
- Banco de Dados (MySQL): porta 3306
- Redis: porta 6379

## 🛠️ Comandos úteis

Parar os containers:
```bash
docker-compose down
```

Visualizar logs:
```bash
docker-compose logs -f
```


