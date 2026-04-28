// src/models/Associacao.js

const Pedido     = require('./Pedido');
const ItemPedido = require('./ItemPedido');
const Produto    = require('./Produto');

// Um pedido tem muitos itens
Pedido.hasMany(ItemPedido, {
  foreignKey: 'pedido_id',
  as: 'itens'
});

// Um item pertence a um pedido
ItemPedido.belongsTo(Pedido, {
  foreignKey: 'pedido_id',
  as: 'pedido'
});

// Um produto aparece em muitos itens
Produto.hasMany(ItemPedido, {
  foreignKey: 'produto_id',
  as: 'itens'
});

// Um item pertence a um produto
ItemPedido.belongsTo(Produto, {
  foreignKey: 'produto_id',
  as: 'produto'
});