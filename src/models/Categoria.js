    // src/models/Categoria.js

    const { DataTypes } = require('sequelize');
    const sequelize = require('../config/sequelize');

    const Categoria = sequelize.define(
        'Categoria',
        {
            nome:
            {
                type: DataTypes.STRING(80),
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'O nome da categoria é obrigatório'
                    },
                    len: {
                        args: [3, 80],
                        msg: 'O nome da categoria deve ter entre 3 e 80 caracteres',
                    },
                },
            },
        },
        {
            tableName: 'categorias',
            timestamps: false
        }
    );

    module.exports = Categoria;