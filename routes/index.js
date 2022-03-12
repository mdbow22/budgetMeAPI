
const auth = require('../utils/auth');

const routes = (fastify, options, done) => {
    fastify.register(auth);
    fastify.register(require('./userRoutes'), {prefix: '/user'});
    fastify.register(require('./accountRoutes'), {prefix: '/accounts'});
    fastify.register(require('./transactionRoutes'), {prefix: '/transaction'});

    done();
};

module.exports = routes;