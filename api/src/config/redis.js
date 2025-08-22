const Redis = require('ioredis');
const serverConfig = require('./server.config');

const options = {
    port : serverConfig.REDIS_PORT,
    host: serverConfig.REDIS_HOST,
    db:serverConfig.REDIS_DB,
}

const redis = new Redis(options);

redis.on('connect', () => console.log('[redis] connecting...'));
redis.on('ready', () => console.log('[redis],ready'));
redis.on('error', (err)=> console.log('[redis] error:', err.message));
redis.on('end', () => console.log('[redix] connection closed'));
redis.on('reconnecting', () => console.log('[redis] reconnecting...'));

async function ping(){
    try{
        return await redis.ping();
    }
    catch(e){
        return null;
    }
}

async function quit(){
    try{
        await redis.quit();
    }
    catch(e){
        console.log('Shutting Down...')
    }
}

module.exports = {redis, ping, quit};