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

//Hooks to update an account's balance when user messes with transactions

Transaction.afterCreate(async (transaction) => {
    
    //if user posts a new transaction, make sure the account's balance gets updated appropriately
    const updateBalance = await Account.increment('balance',{
        by: transaction.amount,
        where: {
            id: transaction.account_id,
        }
    })

    return updateBalance;
});

Transaction.afterDestroy(async (transaction) => {

    //subtract transaction amount from account balance when it's removed
    const updateBalance = await Account.decrement('balance', {
        by: transaction.amount,
        where: {
            id: transaction.account_id,
        }
    });

    return updateBalance;
});

Transaction.afterUpdate(async (transaction) => {
    //placeholder: use this function to update the balance of an account
    //when a transaction is changed
    console.log(transaction);
    //Only needs to run if amount or credit/debit is altered.
})

module.exports = { User, Account, Transaction };