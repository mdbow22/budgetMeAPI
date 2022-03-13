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

Transaction.afterCreate(async (transaction) => {
    //placeholder: use this function to update the balance of an account
    //when a transaction is added.

    const updateBalance = await Account.increment('balance',{
        by: transaction.amount,
        where: {
            id: transaction.account_id,
        }
    })

    return updateBalance;

});

module.exports = { User, Account, Transaction };