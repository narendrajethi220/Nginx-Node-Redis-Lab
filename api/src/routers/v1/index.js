const Router = require('express');
const pingHandler = require('../../controllers/ping.controller');
const currentTimeHandler = require('../../controllers/currentTime.controller');
const { healthCheckHanler,setCacheHandler, getCacheHandler } = require('../../controllers/redis.controller');

const v1Router = Router();

v1Router.get('/ping',pingHandler);
v1Router.get('/health',healthCheckHanler);
v1Router.get('/time',currentTimeHandler);
v1Router.post('/cache',setCacheHandler);
v1Router.get('/cache',getCacheHandler);

module.exports = v1Router;
