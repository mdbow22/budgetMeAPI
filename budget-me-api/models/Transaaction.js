const sequelize = require('../config/connection');
const { DataTypes } = require('sequelize');

const Transaction = sequelize.define('Transactions', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    category: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    amount: {
        type: DataTypes.DECIMAL(19,3),
    },
    date: {
        type: DataTypes.DATE,
    },
    third_party: {
        type: DataTypes.STRING,
    },
    account_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Accounts',
            key: 'id',
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Categories',
            key: 'id',
        }
    }
}, {
    sequelize
});

module.exports = Transaction;