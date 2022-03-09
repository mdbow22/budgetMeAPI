const { User } = require("../models");

const makeUser = async (user) => {
    try {
        const newUser = await User.create({
            username: user.username,
            password: user.password,
            email: user.email,
        });

        return newUser;
    } catch (err) {
        return err;
    }
};

const getUser = async (id) => {
    try {
        const user = await User.findByPk(id);

        return user;

    } catch (err) {
        return err;
    }
}

module.exports = { makeUser, getUser };