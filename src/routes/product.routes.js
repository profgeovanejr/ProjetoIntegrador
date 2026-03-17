// Aula 02 - Prática 3: Rotas e Controllers
// Arquivo: src/routes/product.routes.js

const express = require('express');
const ProductController = require('../controllers/product.controller');

// Criar um roteador
const router = express.Router();

// Definir a rota GET para listar produtos
router.get('/', ProductController.list);

// Definir a rota POST para criar novo produto
router.post('/', ProductController.create);

// Exportar o roteador
module.exports = router;