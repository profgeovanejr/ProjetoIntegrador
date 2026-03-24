// src/routes/produtoRoutes.js

const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/produtoController');

console.log(ProdutoController);
// GET /produtos - Listar produtos
router.get('/', ProdutoController.listaProduto);

// GET /produtos/:id - Detalhar produto
router.get('/:id', ProdutoController.buscaProdutoPorId);

// POST /produtos - Criar produto
router.post('/', ProdutoController.criaProduto);

// PUT /produtos/:id - Atualizar produto completo
router.put('/:id', ProdutoController.atualizaProduto);

// PATCH /produtos/:id/ativo - Ativar/desativar produto
router.patch('/:id/ativo', ProdutoController.atualizaStatus);

// PATCH /produtos/:id/estoque - Ajustar estoque
router.patch('/:id/estoque', ProdutoController.atualizaEstoque);

// DELETE /produtos/:id - Deletar produto
router.delete('/:id', ProdutoController.excluiProduto);

module.exports = router;