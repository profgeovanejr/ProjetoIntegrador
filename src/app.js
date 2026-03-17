/**
 * app.js
 * 
 * Configuração principal da aplicação Express
 * Define rotas, middlewares e tratamento de erros
 */

const express = require('express');
const app = express();

// ============================================
// MIDDLEWARES GLOBAIS
// ============================================

// Parser JSON
app.use(express.json());

// Parser URL-encoded
app.use(express.urlencoded({ extended: true }));

// Middleware de logging (simples)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ============================================
// ROTAS
// ============================================

// Importar controllers
const produtoController = require('./controllers/produtoController');
const orderController = require('./controllers/pedidoController');

// ============================================
// ROTAS DE PRODUTOS
// ============================================

// POST /produtos - Criar produto
app.post('/produtos', produtoController.create);

// GET /produtos - Listar produtos
app.get('/produtos', produtoController.list);

// GET /produtos/:id - Detalhar produto
app.get('/produtos/:id', produtoController.findById);

// PUT /produtos/:id - Atualizar produto completo
app.put('/produtos/:id', produtoController.update);

// PATCH /produtos/:id/active - Ativar/desativar produto
app.patch('/produtos/:id/active', produtoController.updateActive);

// PATCH /produtos/:id/stock - Ajustar estoque
app.patch('/produtos/:id/stock', produtoController.updateStock);

// DELETE /produtos/:id - Deletar produto
app.delete('/produtos/:id', produtoController.remove);

// ============================================
// ROTAS DE PEDIDOS
// ============================================

// POST /orders - Criar pedido
app.post('/orders', orderController.create);

// GET /orders - Listar pedidos
app.get('/orders', orderController.list);

// GET /orders/:id - Detalhar pedido
app.get('/orders/:id', orderController.findById);

// PATCH /orders/:id/status - Alterar status do pedido
app.patch('/orders/:id/status', orderController.updateStatus);

// ============================================
// ROTAS DE SAÚDE
// ============================================

// GET / - Health check
app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'API REST - Aula 03',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// ============================================
// TRATAMENTO DE ROTAS NÃO ENCONTRADAS
// ============================================

app.use((req, res) => {
  return res.status(404).json({
    message: 'Rota não encontrada',
    path: req.path,
    method: req.method
  });
});

// ============================================
// TRATAMENTO GLOBAL DE ERROS
// ============================================

app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);

  return res.status(500).json({
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Erro desconhecido'
  });
});

module.exports = app;

/**
 * ESTRUTURA DA APLICAÇÃO:
 * 
 * 1. MIDDLEWARES GLOBAIS
 *    - express.json(): Parse de JSON
 *    - express.urlencoded(): Parse de form data
 *    - Logging: Registra requisições
 * 
 * 2. ROTAS
 *    - /produtos: CRUD de produtos
 *    - /orders: Gerenciamento de pedidos
 *    - /: Health check
 * 
 * 3. TRATAMENTO DE ERROS
 *    - 404: Rota não encontrada
 *    - 500: Erro não tratado
 * 
 * PRÓXIMO PASSO: Ver server.js para iniciar o servidor
 */