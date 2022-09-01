"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RengaList = exports.RengaCreate = void 0;
const renga_create_1 = require("../../schemas/renga.create");
const rengaCreate_1 = require("../handlers/rengaCreate");
const rengaList_1 = require("../handlers/rengaList");
const wrapHandler_1 = require("../../utils/wrapHandler");
async function RengaCreate(fastify) {
    fastify.route({
        method: 'POST',
        url: '/renga',
        schema: renga_create_1.schema,
        handler: (0, wrapHandler_1.wrapHandler)(rengaCreate_1.createHandler)
    });
}
exports.RengaCreate = RengaCreate;
async function RengaList(fastify) {
    fastify.route({
        method: 'GET',
        url: '/renga/list',
        schema: renga_create_1.schema,
        handler: (0, wrapHandler_1.wrapHandler)(rengaList_1.listHandler)
    });
}
exports.RengaList = RengaList;
