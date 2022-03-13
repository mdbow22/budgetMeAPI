const { Transaction, Account } = require("../models")
const accountRoutes = require("../routes/accountRoutes")

const getAllTransactions = async (user) => {
    const allTransactions = await Transaction.findAll({
        include: {
            model: Account,
            where: {
                user_id: user.id,
            }
        }
    });

    if(!allTransactions) {
        throw new Error('no transactions found');
    }

    return allTransactions;
}

const postTransaction = async (account, transaction) => {
    const newTransaction = await Transaction.create({
        category: transaction.category,
        description: transaction.description,
        amount: transaction.type === 'credit' ? transaction.amount : transaction.amount * -1,
        date: transaction.date,
        account_id: account,
    });

    return newTransaction;
}

module.exports = { getAllTransactions, postTransaction };