const { all } = require("../src/app");

module.exports = {

  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('produtos', 'categoria_id',
      {
        type: Sequelize.INTEGER,
        allowNull: true, // Torna preenchimento não obrigatório
        references: {
          model: 'categorias',
          key: 'id'          
        }
      });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('produtos', 'categoria_id');
  }

};
