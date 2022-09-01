"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listHandler = void 0;
const handler = async (service, request, reply) => {
    const list = await service.storage.list();
    console.log('----list----', list);
    return reply.code(200).send(JSON.stringify(list));
};
exports.listHandler = handler;
