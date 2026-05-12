module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categorias',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false
        }
      });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('categorias');
  }
};
