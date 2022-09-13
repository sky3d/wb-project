"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const pino_1 = __importDefault(require("pino"));
const fastify_1 = __importDefault(require("fastify"));
const fastify_cors_1 = __importDefault(require("fastify-cors"));
const fastify_favicon_1 = __importDefault(require("fastify-favicon"));
const fastify_formbody_1 = __importDefault(require("fastify-formbody"));
const fastify_routes_1 = __importDefault(require("fastify-routes"));
const fastify_helmet_1 = __importDefault(require("fastify-helmet"));
const server_1 = require("./configs/server");
const renga_1 = require("./services/renga");
const routes_1 = require("./api/routes");
const logger = (0, pino_1.default)();
async function main() {
    const app = (0, fastify_1.default)({
        logger
    });
    app.log.info('=> starting app %s', Date.now().toString());
    app.log.info('config %o', JSON.stringify(server_1.envConfig));
    app.decorate('config', server_1.envConfig);
    app.register(fastify_cors_1.default);
    app.register(fastify_favicon_1.default);
    app.register(fastify_formbody_1.default);
    app.register(fastify_helmet_1.default, { contentSecurityPolicy: false });
    app.register(fastify_routes_1.default);
    app.register(routes_1.routes);
    app.decorate('renga', (0, renga_1.renga)(logger, {}));
    await app.ready();
    app.log.info('successfully booted');
    app.listen(app.config.PORT, app.config.HOST, () => {
        app.log.info({ routes: app.routes }, 'registered routes:');
    });
}
exports.main = main;
