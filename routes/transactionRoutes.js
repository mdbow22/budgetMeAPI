const { getAllTransactions, postTransaction } = require("../controllers/transactionControls");

const transactionRoutes = (fastify, options, done) => {

    const authOpts = {
        preValidation: [fastify.userAuth],
    }

    fastify.get('/retrieveAll',authOpts, async (req, reply) => {
        const allTransactions = await getAllTransactions(req.user);

        reply.status(200).send(allTransactions);
    })

    done();


    fastify.post('/newTransaction', async (req, reply) => {
        try {
            const newTransaction = await postTransaction(req.body.account, req.body.transaction);

            reply.status(201).send(newTransaction);
        } catch (err) {
            reply.status(400).send(err);
        }
        
    })
};

module.exports = transactionRoutes;