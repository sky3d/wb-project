"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const errorHandler_1 = require("../handlers/errorHandler");
const health_1 = require("./health");
const renga_1 = require("./renga");
const routes = async (fastify) => {
    fastify.setErrorHandler(errorHandler_1.errorHandler);
    fastify.register(health_1.StatusRoute);
    fastify.register(renga_1.RengaCreate, { prefix: '/api' });
    fastify.register(renga_1.RengaList, { prefix: '/api' });
    fastify.log.info('routes registered:');
};
exports.routes = routes;
