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

module.exports = { getAllTransactions };