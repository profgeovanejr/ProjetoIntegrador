// src/middlewares/autenticarMiddleware.js

const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
    // 1. Verifica se o header Authorization foi enviado
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({
            mensagem: 'Token não fornecido.'
        });
    }

    // 2. Verifica se o formato é "Bearer <token>"
    const partes = authHeader.split(' ');

    if (partes.length !== 2 || partes[0] !== 'Bearer') {
        return res.status(401).json({
            mensagem: 'Formato de token inválido.'
        });
    }

    const token = partes[1];

    // 3. Verifica a assinatura e a validade do token
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Anexa os dados do usuário autenticado à requisição
        req.usuario = {
            id: payload.sub,
            nome: payload.nome,
            perfil: payload.perfil
        };

        // 5. Passa para o próximo middleware ou controller
        next();

    } catch (erro) {
        // jwt.verify lança erros específicos que podemos tratar
        if (erro.name === 'TokenExpiredError') {
            return res.status(401).json({
                mensagem: 'Token expirado.'
            });
        }

        return res.status(401).json({
            mensagem: 'Token inválido.'
        });
    }
}

module.exports = autenticar;