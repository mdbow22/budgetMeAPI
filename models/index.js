const User = require('./Users');
const Account = require('./Accounts');
const Transaction = require('./Transaaction');

User.hasMany(Account, {
    foreignKey: 'user_id',
});

Account.belongsTo(User, {
    foreignKey: 'user_id',
});

Account.hasMany(Transaction, {
    foreignKey: 'account_id',
});

Transaction.belongsTo(Account, {
    foreignKey: 'account_id',
});

module.exports = { User, Account, Transaction };