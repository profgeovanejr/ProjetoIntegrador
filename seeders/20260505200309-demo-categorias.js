module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categorias', [
      {
        nome: 'Eletrônicos'
      },
      {
        nome: 'Alimentos'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categorias', {
      nome: ['Eletrônicos', 'Alimentos']
    });
  }
};
