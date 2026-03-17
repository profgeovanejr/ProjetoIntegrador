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
const pedidoController = require('./controllers/pedidoController');

// ============================================
// ROTAS DE PRODUTOS
// ============================================
// ✅ Usar o arquivo de rotas
const produtoRoutes = require('./routes/produtoRoutes');
app.use('/produtos', produtoRoutes);

// ============================================
// ROTAS DE PEDIDOS
// ============================================

// POST /pedidos - Criar pedido
app.post('/pedidos', pedidoController.criaPedido);

// GET /pedidos - listaProdutoar pedidos
app.get('/pedidos', pedidoController.listaPedido);

// GET /pedidos/:id - Detalhar pedido
app.get('/pedidos/:id', pedidoController.buscaPorId);

// PATCH /pedidos/:id/status - Alterar status do pedido
app.patch('/pedidos/:id/status', pedidoController.atualizaPedidoStatus);

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
 *    - /pedidos: Gerenciamento de pedidos
 *    - /: Health check
 * 
 * 3. TRATAMENTO DE ERROS
 *    - 404: Rota não encontrada
 *    - 500: Erro não tratado
 * 
 * PRÓXIMO PASSO: Ver server.js para iniciar o servidor
 */