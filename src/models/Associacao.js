// src/models/Associacao.js

const Pedido     = require('./Pedido');
const ItemPedido = require('./ItemPedido');
const Produto    = require('./Produto');
const Categoria  = require('./Categoria');

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

// Um produto está em uma categoria
Produto.belongsTo(Categoria, {
  foreignKey: 'categoria_id',
})

// Uma categoria possui varios produtos
Categoria.hasMany(Produto, {
  foreignKey: 'categoria_id',
})



