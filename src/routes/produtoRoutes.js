// src/routes/produtoRoutes.js

const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/produtoController');
const autenticar = require('../middlewares/autenticarMiddleware');
const autorizar = require('../middlewares/autorizarMiddleware');

// Rotas públicas (sem autenticação)

// GET /produtos - Listar produtos
router.get('/', ProdutoController.listaProduto);

// GET /produtos - Listar produtos ativos
router.get('/ativo', ProdutoController.listaProdutoAtivo);

// GET /produtos/:id - Detalhar produto
router.get('/:id', ProdutoController.buscaProdutoPorId);

// Rotas protegidas (com autenticação)

// POST /produtos - Criar produto
router.post('/', autenticar, autorizar('admin'), ProdutoController.criaProduto);

// PUT /produtos/:id - Atualizar produto completo
router.put('/:id', autenticar, autorizar('admin'), ProdutoController.atualizaProduto);

// PATCH /produtos/:id/ativo - Ativar/desativar produto
router.patch('/:id/ativo', autenticar, autorizar('admin'), ProdutoController.atualizaStatus);

// PATCH /produtos/:id/estoque - Ajustar estoque
router.patch('/:id/estoque', autenticar, autorizar('admin'), ProdutoController.atualizaEstoque);

// DELETE /produtos/:id - Deletar produto
router.delete('/:id', autenticar, autorizar('admin'), ProdutoController.excluiProduto);

module.exports = router;