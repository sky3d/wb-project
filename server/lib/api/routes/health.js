"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusRoute = void 0;
async function StatusRoute(fastify) {
    fastify.route({
        method: 'GET',
        url: '/health',
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        status: { type: 'string' },
                    },
                },
            },
        },
        handler: (_, reply) => { reply.send({ status: 'ok' }); },
    });
}
exports.StatusRoute = StatusRoute;
