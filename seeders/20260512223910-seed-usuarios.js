'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const senha_hash = await bcrypt.hash('Senha@123', 10);

    await queryInterface.bulkInsert('usuarios', [
      {
        nome: 'Admin do Sistema',
        email: 'admin@ecommerce.com',
        senha_hash,
        perfil: 'admin',
        ativo: true,
        data_criacao: new Date()
      },
      {
        nome: 'Maria Silva',
        email: 'maria@email.com',
        senha_hash,
        perfil: 'cliente',
        ativo: true,
        data_criacao: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};