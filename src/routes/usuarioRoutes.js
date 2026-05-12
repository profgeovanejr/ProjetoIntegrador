// src/routes/usuarioRoutes.js

const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');

console.log(UsuarioController);

// POST /login - Autenticacao do usuario
router.post('/login', UsuarioController.login);

module.exports = router;