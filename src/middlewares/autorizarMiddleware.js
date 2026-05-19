// src/middlewares/autorizarMiddleware.js

function autorizar(...perfisPermitidos) {
  return function (req, res, next) {

    // 1. Verifica se o middleware autenticar foi executado antes
    if (!req.usuario) {
      return res.status(401).json({
        mensagem: 'Usuário não autenticado.'
      });
    }

    // 2. Verifica se o perfil do usuário está entre os permitidos
    const perfilDoUsuario = req.usuario.perfil;
    const temPermissao = perfisPermitidos.includes(perfilDoUsuario);

    if (!temPermissao) {
      return res.status(403).json({
        mensagem: 'Acesso negado. Você não tem permissão para esta ação.'
      });
    }

    // 3. Perfil autorizado, segue para o controller
    next();
  };
}

module.exports = autorizar;