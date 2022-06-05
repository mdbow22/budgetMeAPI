const fp = require('fastify-plugin');



const auth = fp(async (fastify, opts) => {

    //set-up JWT for use within backend
    fastify.register(require('fastify-jwt'), {
        secret: process.env.JWT_SECRET,
        expiresIn: 86400000
    });

    //verification of JWT to authenticate a user and use their credentials
    fastify.decorate('userAuth', async (req, reply) => {
        try {
            await req.jwtVerify();
        } catch (err) {
            console.log(err);
            reply.send(err);
        }
    })

    fastify.decorate('authOpts', {
        preValidation: [fastify.userAuth],
    }, ['userAuth']);
})

module.exports = auth;