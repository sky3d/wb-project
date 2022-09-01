"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, _, reply) => {
    const body = { error: error.message };
    reply.code(400);
    reply.type('application/json');
    reply.send(body);
};
exports.errorHandler = errorHandler;
