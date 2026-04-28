// src/models/ItemPedido.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const ItemPedido = sequelize.define('ItemPedido', {
    pedido_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    produto_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valor_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'itens_pedido',
    timestamps: false
    // Essa tabela não tem data_criacao nem data_atualizacao
    // timestamps: false desabilita a busca automática por essas colunas
});

module.exports = ItemPedido;