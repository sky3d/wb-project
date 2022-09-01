"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHandler = void 0;
const shortid_1 = __importDefault(require("shortid"));
const handler = async (service, request, _) => {
    const payload = request.body;
    request.log.info({ body: request.body }, 'renga.create request');
    request.log.info('ping:', service.ping());
    const renga = {
        id: (0, shortid_1.default)(),
        name: payload.name || 'New renga',
    };
    return renga;
};
exports.createHandler = handler;
