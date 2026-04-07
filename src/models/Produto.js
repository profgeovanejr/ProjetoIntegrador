// src/models/Produto.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Produto = sequelize.define(
    'Produto',            // nome do model
    {
        // Sequelize cria o campo `id` automaticamente (PK, auto increment)
        nome: {
            type: DataTypes.STRING(120),
            allowNull: false,
            validate: {
                notEmpty: { msg: 'O nome do produto é obrigatório' },
                len: {
                    args: [4, 120],
                    msg: 'O nome deve ter entre 4 e 120 caracteres',
                },
            },
        },
        descricao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        valorUnitario: {
            type: DataTypes.DECIMAL(10, 2),
            field: 'valor_unitario', // mapeia para valor_unitario no banco
            allowNull: false,
            validate: {
                isDecimal: { msg: 'O valor do preço deve ser numérico' },
                min: {
                    args: [0.01],
                    msg: 'O valor do preço deve ser maior que zero',
                },
            },
        },
        quantidadeEstoque: {
            type: DataTypes.INTEGER,
            field: 'quantidade_estoque', // mapeia para quantidade_estoque no banco
            defaultValue: 0,
            validate: {
                min: {
                    args: [0],
                    msg: 'A quantidade de unidades do produto em estoque deve ser maior ou igual a zeros',
                },
            },
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableName: 'produtos',    // força o nome exato da tabela no MySQL
        timestamps: true,         // cria createdAt e updatedAt automaticamente
        underscored: true,        // converte createdAt → created_at no banco

        createdAt: 'data_criacao',    // renomeia createdAt para data_criacao
        updatedAt: 'data_atualizacao' // renomeia updatedAt para data_atualizacao
    }
);

module.exports = Produto;
