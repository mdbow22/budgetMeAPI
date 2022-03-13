const { Op } = require('sequelize');
const { Account } = require("../models");

const makeNewAccount = async (request) => {
    const { user, body } = request;

    const query = {
        ...body,
        starting_balance: body.balance ?? null,
        user_id: user.id
    }

    return await Account.create(query);
}

const changeAccountInfo = async (request) => {
    console.log('hit');
    const { user, body } = request;

    let accountToChange
    if(body.id) {
        accountToChange = await Account.update(
            {
                balance: body.balance,
                type: body.type,
                name: body.newName,
            },
            {
                where: {
                    id: body.id
                }
            }
        )
    } else {
        accountToChange = await Account.update(
            {
                balance: body.balance,
                type: body.type,
                name: body.newName,
            },
            {
                where: {
                    [Op.and]: [
                        { user_id: user.id },
                        { name: body.name }
                    ]
                }
            }
        )
    }

        console.log(accountToChange);

    if(accountToChange[0] === 0) {
        throw new Error('Unable to locate any accounts');
    }

    return accountToChange;
}

const removeAccount = async (request) => {
    const { user, body } = request;

    console.log('user: ', user);

    const destroyed = await Account.destroy({
        where: {
            id: body.id,
            user_id: user.id,
        }
    })

    if(destroyed === 0) {
        throw new Error('Could not destroy');
    }
    console.log(destroyed);
    return destroyed; 
}

module.exports = { makeNewAccount, changeAccountInfo, removeAccount };