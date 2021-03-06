const { makeUser, loginUser, getUser } = require('../controllers/userControls');

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
        try {
            const newUser = await makeUser(req.body);

            //sign token so user can be logged in after the create an account
            const token = fastify.jwt.sign({username: req.body.username, email: req.body.email, id: newUser.id});
            const userInfo = {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
            }

            reply.status(201).send({token, userInfo});
        
        } catch (err) {
            console.log(err);
            reply.status(400).send(err);
        }
        
    })

    fastify.post('/login', async (req, reply) => {
        try {
            const foundUser = await loginUser(req.body);

            //sign token
            let token;
            let signedUser;
            if(foundUser) {
                token = fastify.jwt.sign({username: foundUser.username, email: foundUser.email, id: foundUser.id})
                signedUser = {
                    id: foundUser.id,
                    email: foundUser.email,
                    username: foundUser.username,
                }
            }

            reply.status(200).send({token, signedUser});

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