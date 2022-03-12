const sequelize = require('../config/connection');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { use } = require('bcrypt/promises');

const User = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        
    }
}, {
    sequelize
});

User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 13);

    return user;
});

User.beforeUpdate(async (user) => {
    if(user.password) {
        user.password = await bcrypt.hash(user.password, 13);
    }

    return user;
});

module.exports = User;