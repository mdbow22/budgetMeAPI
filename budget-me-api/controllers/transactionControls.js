const { Transaction, Account, Category } = require("../models")

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
        amount: transaction.amount,
        date: transaction.date,
        account_id: account,
    });

    return newTransaction;
}

const destroyTransaction = async (user, id) => {
    const transToDestroy = await Transaction.findByPk(id, {
        include: Account,
    });
    console.log('Transaction to Destroy: ', transToDestroy);
    if(!transToDestroy) {
        throw new Error('Transaction does not exist');
    }

    if(transToDestroy.Account.user_id !== user.id) {
        throw new Error('Unauthoized Request');
    }

    const destroyedTransaction = await transToDestroy.destroy();

    return destroyedTransaction;

}

const changeTransaction = async (user, id, transaction) => {
    const transToUpdate = await Transaction.findByPk(id, {
        include: {
            model: Account,
            attributes: ['id','name','user_id'],
        }
    });

    if(!transToUpdate) {
        throw new Error('Transaction does not exist');
    }

    if(transToUpdate.Account.user_id !== user.id) {
        throw new Error('Unauthorized Request');
    }

    transToUpdate.update({
        category: transaction.category,
        description: transaction.description,
        amount: transaction.amount,
        date: transaction.date,
    });

    return transToUpdate;
}

const getCategories = async () => {
    const allCategories = await Category.findAll();

    return allCategories;
}

module.exports = { getAllTransactions, postTransaction, destroyTransaction, changeTransaction, getCategories };