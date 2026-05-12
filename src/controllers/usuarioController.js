const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

async function login(req, res) {
    const { email, senha } = req.body;

    // 1. Validação básica dos campos obrigatórios
    if (!email || !senha) {
        return res.status(400).json({
            mensagem: 'Email e senha são obrigatórios.'
        });
    }

    try {
        // 2. Busca o usuário pelo email via Sequelize
        const usuario = await Usuario.findOne({
            where: { email }
        });

        console.log('Usuario encontrado:', usuario ? usuario.email : 'não encontrado');
        console.log('Ativo:', usuario ? usuario.ativo : 'n/a');
        // 3. Verifica se o usuário existe e está ativo
        // (mesma mensagem para email inexistente e senha errada)
        if (!usuario || !usuario.ativo) {
            return res.status(401).json({
                mensagem: 'Credenciais inválidas.'
            });
        }

        // 4. Compara a senha fornecida com o hash armazenado
        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
        console.log('Senha válida:', senhaValida);

        if (!senhaValida) {
            return res.status(401).json({
                mensagem: 'Credenciais inválidas.'
            });
        }

        // 5. Gera o token JWT
        const token = jwt.sign(
            {
                sub: usuario.id,
                nome: usuario.nome,
                perfil: usuario.perfil
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        // 6. Retorna o token e dados básicos do usuário
        return res.status(200).json({
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                perfil: usuario.perfil
            }
        });

    } catch (erro) {
        console.error('Erro no login:', erro);
        return res.status(500).json({
            mensagem: 'Erro interno no servidor.'
        });
    }
}

module.exports = { login };