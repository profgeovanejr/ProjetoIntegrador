// src/models/Pedido.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Pedido = sequelize.define('Pedido', {
    nome_cliente: {
        type: DataTypes.STRING(120),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(
            'pendente',
            'confirmado',
            'enviado',
            'entregue',
            'cancelado'
        ),
        defaultValue: 'pendente'
    }
}, {
    tableName: 'pedidos',
    timestamps: true,
    createdAt: 'data_criacao',
    updatedAt: 'data_atualizacao'
});

module.exports = Pedido;