// src/models/Produto.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'O nome do usuário é obrigatório' },
            len: {
                args: [4, 100],
                msg: 'O nome deve ter entre 4 e 100 caracteres',
            },
        },
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'O email do usuário é obrigatório' },
            len: {
                args: [10, 50],
                msg: 'O email deve ter entre 10 e 50 caracteres',
            },
        },
        unique: true
    },
    senha_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    perfil: {
        type: DataTypes.ENUM('cliente', 'admin'),
        allowNull: false,
        defaultValue: 'cliente'
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'usuarios',
    timestamps: true,
    createdAt: 'data_criacao',
    updatedAt: false
});

module.exports = Usuario;