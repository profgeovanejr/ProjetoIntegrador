# 🛒 API de Catálogo de Produtos e Pedidos

> Projeto Integrador — Desenvolvimento Back-End com Node.js  
> Disciplina: Web Programming Back-End | UniFECAF — 2026/1

---

## 📋 Sobre o Projeto

API REST desenvolvida em Node.js + Express para gestão de um e-commerce, com suporte a produtos, pedidos e autenticação de usuários. Projeto construído incrementalmente ao longo das aulas, integrando banco de dados MySQL, autenticação JWT e boas práticas de arquitetura em camadas.

---

## 🚀 Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express | 4.x | Framework HTTP |
| MySQL | 8.x | Banco de dados relacional |
| mysql2 | latest | Driver MySQL para Node.js |
| dotenv | latest | Variáveis de ambiente |
| JWT | latest | Autenticação *(Aula 09)* |

---

## 📁 Estrutura do Projeto

```
ecommerce-api/
├── src/
│   ├── config/
│   │   └── database.js          # Conexão com MySQL (pool)
│   ├── controllers/
│   │   ├── produtoController.js # Lógica dos endpoints de produtos
│   │   └── pedidoController.js  # Lógica dos endpoints de pedidos
│   ├── routes/
│   │   ├── produtoRoutes.js     # Rotas de produtos
│   │   └── pedidoRoutes.js      # Rotas de pedidos
│   └── app.js                   # Configuração Express + middlewares
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Como Rodar Localmente

### Pré-requisitos

- [Node.js 18+](https://nodejs.org)
- [MySQL 8+](https://dev.mysql.com/downloads/)
- [Git](https://git-scm.com)

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/ecommerce-api.git
cd ecommerce-api
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

```bash
TBD
```

### 4. Criar o banco de dados

Abra o terminal MySQL e execute:

```sql
CREATE DATABASE projetoIntegrador;
USE projetoIntegrador;

CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  descricao TEXT,
  valor_unitario DECIMAL(10,2) NOT NULL
        CHECK (valor_unitario > 0),
  quantidade_estoque INTEGER DEFAULT 0
        CHECK (quantidade_estoque >= 0),
  ativo BOOLEAN DEFAULT true,
  data_criacao TIMESTAMP DEFAULT NOW(),
  data_atualizacao TIMESTAMP DEFAULT NOW()
);
```

### 5. Iniciar o servidor

```bash
# Desenvolvimento (com nodemon)
npm run dev

# Produção
npm start
```

Acesse: `http://localhost:3000`

---

## 📡 Endpoints

### Health Check

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Verifica se a API está no ar |

### Produtos

| Método | Rota | Descrição | Status |
|--------|------|-----------|--------|
| POST | `/produtos` | Criar produto | ✅ |
| GET | `/produtos` | Listar produtos | ✅ |
| GET | `/produtos/:id` | Detalhar produto | ✅ |
| PUT | `/produtos/:id` | Atualizar produto completo | ✅ |
| PATCH | `/produtos/:id/ativo` | Ativar / desativar produto | ✅ |
| PATCH | `/produtos/:id/estoque` | Ajustar estoque | ✅ |
| DELETE | `/produtos/:id` | Remover produto | ✅ |

### Pedidos *(Aula TBD)*

| Método | Rota | Descrição | Status |
|--------|------|-----------|--------|
| POST | `/pedidos` | Criar pedido | ✅ |
| GET | `/pedidos` | Listar pedidos | ✅ |
| GET | `/pedidos/:id` | Detalhar pedido | ✅ |
| PATCH | `/pedidos/:id/status` | Alterar status do pedido | ✅ |

### Autenticação *(Aula TBD)*

| Método | Rota | Descrição | Status |
|--------|------|-----------|--------|
| POST | `/auth/register` | Criar conta | 🔜 |
| POST | `/auth/login` | Login e geração de token JWT | 🔜 |
| GET | `/me` | Dados do usuário logado | 🔜 |

---

## 📦 Exemplos de Uso

### Criar produto

```http
POST /produtos
Content-Type: application/json

{
  "nome": "Mouse Gamer RGB",
  "valor_unitario": 149.90,
  "quantidade_estoque": 25,
  "descricao": "Mouse com 7 botões e iluminação RGB"
}
```

**Resposta `201 Created`:**
```json
{
  "message": "Produto criado com sucesso",
  "product": {
    "id": 1,
    "nome": "Mouse Gamer RGB",
    "valor_unitario": 149.90,
    "quantidade_estoque": 25,
    "ativo": true,
    "data_criacao": "2026-03-17T10:00:00.000Z"
  }
}
```

### Listar produtos ativos

```http
GET /produtos?ativo=true&page=1&limit=10
```

### Ajustar estoque

```http
PATCH /produtos/1/estoque
Content-Type: application/json

{
  "quantity": 50
}
```

---

## 🔒 Status Codes utilizados

| Código | Significado | Quando usar |
|--------|-------------|-------------|
| `200` | OK | GET, PUT, PATCH bem-sucedido |
| `201` | Created | POST bem-sucedido |
| `204` | No Content | DELETE bem-sucedido |
| `400` | Bad Request | Validação falhou |
| `401` | Unauthorized | Sem token JWT |
| `403` | Forbidden | Sem permissão |
| `404` | Not Found | Recurso não existe |
| `409` | Conflict | Ex: estoque insuficiente |
| `500` | Internal Server Error | Erro no servidor |

---

## 🗺️ Roadmap do Projeto

- [x] Aula 01 — Setup do ambiente Node.js e npm
- [x] Aula 02 — Express + rotas + controllers
- [x] Aula 03 — REST, status codes + Postman/Thunder Client
- [x] Aula 04 — Conexão MySQL + modelagem inicial

---

## 📄 Licença

Projeto acadêmico — UniFECAF 2026/1
