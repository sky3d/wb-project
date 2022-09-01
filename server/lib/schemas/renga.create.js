"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const common_1 = require("./common");
const requestSchema = {
    type: 'object',
    required: ['name'],
    properties: {
        name: {
            type: 'string',
        },
    },
};
const responseSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
    },
};
exports.schema = {
    ...requestSchema,
    response: {
        200: responseSchema,
        ...common_1.errorSchemas,
    },
};
