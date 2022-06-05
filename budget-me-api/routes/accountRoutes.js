const { retrieveAccounts, 
    makeNewAccount, 
    changeAccountInfo, 
    removeAccount } = require('../controllers/accountControls');

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

    const authOpts = {
        preValidation: [fastify.userAuth],
    }

    fastify.get('/', authOpts, async (req, reply) => {
        try {
            const accountInfo = await retrieveAccounts(req.user.id);

            reply.status(200).send(accountInfo);
        } catch (err) {
            reply.status(400).send(err);
        }
        
    });

    fastify.post('/create', {
        ...newActOpts,
        ...authOpts
    }, async (req, reply) => {
        const newAccount = await makeNewAccount(req);

        reply.status(201).send(newAccount);
    })

    fastify.put('/updateAccount', authOpts, async (req, reply) => {
        try {
            const updatedAccount = await changeAccountInfo(req);

            reply.status(201).send(updatedAccount);

        } catch (err) {
            console.log(err);
            reply.status(400).send(err);
        }
        
    })

    fastify.delete('/removeAccount', authOpts, async (req, reply) => {
        try {
            const removedAccount = await removeAccount(req);

            reply.status(201).send(removedAccount);
        } catch (err) {
            reply.status(400).send(err);
        }
    })

    done();
}

module.exports = accountRoutes;