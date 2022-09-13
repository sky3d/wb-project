"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const common_1 = require("./common");
const requestSchema = {
    type: 'object'
};
const responseSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        type: {
            type: 'string'
        },
        attributes: {
            type: 'object'
        }
    }
};
exports.schema = {
    ...requestSchema,
    response: {
        200: responseSchema,
        ...common_1.errorSchemas
    }
};
