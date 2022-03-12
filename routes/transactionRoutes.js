const { getAllTransactions } = require("../controllers/transactionControls");

const transactionRoutes = (fastify, options, done) => {

    const authOpts = {
        preValidation: [fastify.userAuth],
    }

    fastify.get('/retrieveAll',authOpts, async (req, reply) => {
        const allTransactions = await getAllTransactions(req.user);

        reply.status(200).send(allTransactions);
    })

    done();
};

module.exports = transactionRoutes;