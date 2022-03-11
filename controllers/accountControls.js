const { Account } = require("../models");

const makeNewAccount = async (request) => {
    const { user, body } = request;

    const query = {
        ...body,
        user_id: user.id
    }

    return await Account.create(query);
}

module.exports = { makeNewAccount };