const bcrypt = require('bcrypt');
const { makeUser, loginUser, getUser } = require('../controllers/userControls');
const { User } = require('../models');

const createOpts = {
    required: ['username','email','password'],
    schema: {
        body: {
            username: {type: 'string'},
            email: {type: 'string'},
            password: {type: 'string'},
        }
    }
}

const userRoutes = (fastify, options, done) => {
    fastify.post(`/create`, createOpts, async (req, reply) => {
        const newUser = await makeUser(req.body);

        return newUser;
    })

    fastify.post('/login', async (req, reply) => {
        try {

            const foundUser = await loginUser(req.body);

            const token = fastify.jwt.sign({username: foundUser.username, email: foundUser.email, id: foundUser.id})

            reply.status(200).send({token, foundUser});

        } catch (err) {
            reply.status(400).send(err);
        }
    });

    fastify.get('/:id', async (req, reply) => {
        const user = await getUser(req.params.id);

        return user;
    })

    fastify.get('/test', {
        preValidation: [fastify.userAuth],
    }, async (req, reply) => {
        reply.status(200).send({hello: "world"});
    })

    done();
};

module.exports = userRoutes;