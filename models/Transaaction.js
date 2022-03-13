const sequelize = require('../config/connection');
const { DataTypes } = require('sequelize');
const { Account } = require('../models');

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
    account_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Accounts',
            key: 'id',
        }
    }
}, {
    sequelize
});



Transaction.afterDestroy(async (transaction) => {
    //placeholder: use this function to update the balance of an account
    //when a transaction is removed.
});

Transaction.afterUpdate(async (transaction) => {
    //placeholder: use this function to update the balance of an account
    //when a transaction is changed

    //Only needs to run if amount or credit/debit is altered.
})

module.exports = Transaction;