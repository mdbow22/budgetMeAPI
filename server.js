require('dotenv').config();
const fastify = require('fastify')({ logger: false });
const sequelize = require('./config/connection');
const auth = require('./utils/auth');
const model = require('./models');

const PORT = process.env.PORT || 3000;

fastify.register(auth);
fastify.register(require('./routes/userRoutes'), {prefix: '/api/user'})
fastify.register(require('./routes/accountRoutes'), {prefix: '/api/accounts'})

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