const { makeNewAccount } = require('../controllers/accountControls');

const newActOpts = {
    schema: {
        required: ['type','name'],
        body: {
            type: 'object',
            properties: {
                type: { 
                    type: 'string',
                    enum: [
                        'checking',
                        'savings',
                        'moneyMarket',
                        'credit',
                        'cd',
                        'investment',
                    ] 
                },
                name: { type: 'string' },
                balance: { type: 'number' },
            }
        }
    }
}

const accountRoutes = (fastify, options, done) => {

    fastify.post('/create', {
        ...newActOpts,
        preValidation: [fastify.userAuth],
    }, async (req, reply) => {
        const newAccount = await makeNewAccount(req);

        reply.status(201).send(newAccount);
    })

    done();
}

module.exports = accountRoutes;