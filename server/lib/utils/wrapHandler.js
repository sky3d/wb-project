"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapHandler = void 0;
const renga_1 = require("../services/renga");
const wrapHandler = (handler) => (request, reply) => {
    const service = (0, renga_1.getRenga)();
    return handler(service, request, reply);
};
exports.wrapHandler = wrapHandler;
