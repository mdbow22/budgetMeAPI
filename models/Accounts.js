const sequelize = require('../config/connection');
const { DataTypes, INTEGER } = require('sequelize');

const Account = sequelize.define('Accounts', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    balance: {
        type: DataTypes.DECIMAL(19,3),
    },
    user_id: {
        type: INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
}, {
    sequelize
})

module.exports = Account;