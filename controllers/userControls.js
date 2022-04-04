const { User } = require("../models");
const bcrypt = require('bcrypt');

const ErrorObject = (type, path) => {
    this.type = type;
    this.path = path;
}

//create a new user
const makeUser = async (user) => {

        try {
            const newUser = await User.create({
                username: user.username,
                password: user.password,
                email: user.email,
            });
    
            return newUser;
        } catch (err) {
            const errors = err.errors.map(err => {
                
                return ({
                type: err.type,
                path: err.path,
                })
            });

            console.log('**********');
            console.log(err.errors);

            throw errors;
        }
};

//login a yser
const loginUser = async (user) => {
    const { username, password } = user;

    if(!username || !password) {
        throw new Error('incorrect parameters sent');
    }

    const findUser = await User.findOne({
        where: {
            username: username
        }
    });

    if(!findUser) {
        throw new Error('invalid username/password');
    }

    const pwMatch = await bcrypt.compare(password, findUser.password);

    if(!pwMatch) {
        throw new Error('invalid username/password');
    }

    return findUser;
}



//retrieve info about user
const getUser = async (id) => {
    try {
        const user = await User.findByPk(id);

        return user;

    } catch (err) {
        return err;
    }
}

module.exports = { makeUser, loginUser, getUser };