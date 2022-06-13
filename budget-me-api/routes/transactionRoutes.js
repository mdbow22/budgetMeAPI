const { getAllTransactions, postTransaction, destroyTransaction, changeTransaction, getCategories } = require("../controllers/transactionControls");
const { Category } = require('../models/Categories');

const transactionRoutes = (fastify, options, done) => {

    const authOpts = {
        preValidation: [fastify.userAuth],
    }

    fastify.get('/retrieveAll',authOpts, async (req, reply) => {
        const allTransactions = await getAllTransactions(req.user);

        reply.status(200).send(allTransactions);
    })

    fastify.post('/newTransaction', authOpts, async (req, reply) => {
        try {
            const newTransaction = await postTransaction(req.body.account, req.body.transaction);

            reply.status(201).send(newTransaction);
        } catch (err) {
            reply.status(400).send(err);
        }
        
    })

    fastify.delete('/deleteTransaction/:id', authOpts, async(req, reply) => {
        try {
            const destroyed = await destroyTransaction(req.user, req.params.id)

            reply.status(200).send(destroyed);
        } catch (err) {
            if(err.message === 'Unauthoized Request') {
                reply.status(401).send(err);
            } else {
                reply.status(400).send(err);
            }
            
        }
    })

    fastify.put('/updateTransaction/:id', authOpts, async(req, reply) => {
        try {
            const updatedTransaction = await changeTransaction(req.user, req.params.id, req.body)

            reply.status(200).send(updatedTransaction);
        } catch (err) {
            if(err.message === 'Unauthorized Request') {
                reply.status(401).send(err);
            } else {
                reply.status(400).send(err);
            }
        }
    })

    fastify.get('/categories', async(req, reply) => {
        try {
            const fetchedCategories = await getCategories();
            if(fetchedCategories) {
                reply.status(200).send(fetchedCategories);
            }
        } catch (err) {
            console.log(err);
        }
    })

    done();
};

module.exports = transactionRoutes;