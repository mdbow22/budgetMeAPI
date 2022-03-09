const bcrypt = require('bcrypt');
const { makeUser, getUser } = require('../controllers/userControls');
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

            console.log(req.body);
            const {username, password } = req.body;

            if(!username || !password) {
                reply.status(400).send({error: true, msg: 'did not fill out login correctly'});
            }

            const findUser = await User.findOne({
                where: {
                    username: username
                }
            });

            console.log(findUser.password);

            if(!findUser) {
                throw new Error('Invalid username/password');
            }

            const pwMatch = await bcrypt.compare(password, findUser.password);

            console.log(pwMatch);

            if(!pwMatch) {
                throw new Error('Invalid username/password');
            }

            const token = fastify.jwt.sign({username, email: findUser.email, id: findUser.id})

            reply.status(200).send({token, findUser});

        } catch (err) {
            throw new Error(err);
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