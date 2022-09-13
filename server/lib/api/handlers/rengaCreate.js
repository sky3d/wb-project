"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHandler = void 0;
const shortid_1 = __importDefault(require("shortid"));
const handler = async (service, request, reply) => {
    const payload = request.body;
    request.log.info({ body: request.body }, 'renga.create request');
    const renga = {
        id: (0, shortid_1.default)(),
        name: payload.name || `Новая ренга`,
    };
    const result = await service.storage.createRenga(renga);
    request.log.info('renga created:', result);
    reply.send({
        id: result?.id,
        type: 'renga',
        attributes: result
    });
};
exports.createHandler = handler;
