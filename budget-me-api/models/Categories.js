const sequelize = require('../config/connection');
const { DataTypes } = require('sequelize');

const Category = sequelize.define('Categories', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM,
        values: [
            'debit',
            'credit',
        ],
        allowNull: false,
    },
    custom: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
        }
    }
},
    {
        sequelize
    });

module.exports = Category;