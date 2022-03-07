require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const sequelize = require('./config/connection');
const model = require('./models');

const PORT = process.env.PORT || 3000;



const start = async () => {
    try {
        await fastify.listen(PORT);
    } catch (err) {
        fastify.log.error(err)
        process.exit(1);
    }
};

sequelize.sync({ force: true }).then(() => {
    start();
})