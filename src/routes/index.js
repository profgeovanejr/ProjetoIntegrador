// Arquivo: src/routes/index.js

const express = require('express');
const productRoutes = require('./product.routes');

// Criar o roteador principal
const router = express.Router();

// Rota de health check
router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Registrar as rotas de produtos
// Todas as rotas em productRoutes serão prefixadas com /produtos
router.use('/produtos', productRoutes);

// Exportar o roteador
module.exports = router;