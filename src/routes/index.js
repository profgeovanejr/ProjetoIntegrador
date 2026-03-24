// Arquivo: src/routes/index.js

const express = require('express');
const produtoRoutes = require('./produtoRoutes');

// Criar o roteador principal
const router = express.Router();

// Rota de health check
router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Registrar as rotas de produtos
// Todas as rotas em produtoRoutes serão prefixadas com /produtos
router.use('/produtos', produtoRoutes);

// Exportar o roteador
module.exports = router;