const dotenv = require('dotenv');

function loadEnv(){
    dotenv.config();
}
loadEnv();

const serverConfig = {
    PORT : process.env.PORT || 5000,
    REDIS_HOST : process.env.REDIS_HOST || "127.0.0.1" ,
    REDIS_PORT : Number (process.env.REDIS_PORT || 6379),
    REDIS_DB :   Number (process.env.REDIS_DB || 0),
};

module.exports = serverConfig;