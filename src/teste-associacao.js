// Teste rápido — pode rodar direto no terminal com node
// src/teste-associacoes.js

require('./models/Associacao'); // Importa as associações para que sejam registradas no Sequelize
const Pedido = require('./models/Pedido');

async function testar() {
  const pedido = await Pedido.findByPk(1, {
    include: [{ association: 'itens' }]
  });
  console.log(JSON.stringify(pedido, null, 2));
}

testar();