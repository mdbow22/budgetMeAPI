require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const sequelize = require('./config/connection');
const auth = require('./utils/auth');
const model = require('./models');

const PORT = process.env.PORT || 3000;

fastify.register(require('./routes'), {prefix: '/api'});
// fastify.register(require('./routes/accountRoutes'), {prefix: '/api/accounts'})
// fastify.register(require('./routes/transactionRoutes', {prefix: '/api/transaction'}));

const start = async () => {
    try {
        await fastify.listen(PORT);
    } catch (err) {
        fastify.log.error(err)
        process.exit(1);
    }
};

sequelize.sync({ force: false }).then(() => {
    start();
})