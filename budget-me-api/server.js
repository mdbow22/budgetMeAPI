require('dotenv').config();
const path = require('path');
const fastify = require('fastify')({ 
    logger: {
        level: 'info',
        prettyPrint:
                {
                    translateTime: 'HH:MM:ss Z',
                    colorize: true,
                }
        }  
    });
const sequelize = require('./config/connection');

const { Category } = require('./models');

const PORT = process.env.PORT || 3001;

if(process.env.NODE_ENV === 'production') {
    fastify.register(require('fastify-static'), {
        root: path.join(__dirname, 'dist'),
    });

    fastify.get('/', async (req, reply) => {
        reply.sendFile('index.html');
    })
}


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

sequelize.sync({ force: true }).then(() => {
    start();
})