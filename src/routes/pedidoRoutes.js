// src/routes/pedidoRoutes.js

const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/pedidoController');

console.log(PedidoController);

// GET /pedidos - Listar pedidos
router.get('/', PedidoController.listarPedido);

// GET /pedidos/:id - Detalhar pedido
router.get('/:id', PedidoController.buscarPedidoPorId);

// POST /pedidos - Criar pedido
router.post('/', PedidoController.criarPedido);

module.exports = router;