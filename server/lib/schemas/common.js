"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorSchemas = exports.headers = void 0;
exports.headers = {};
const validationErrorSchema = {
    type: 'object',
    properties: {
        errors: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    property: { type: 'string' },
                    message: { type: 'string' },
                    code: { type: 'string' },
                },
            },
        },
    },
};
const commonErrorSchema = {
    type: 'object',
    properties: {
        errors: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    code: { type: 'string' },
                    message: { type: 'string' },
                },
            },
        },
    },
};
exports.errorSchemas = {
    400: validationErrorSchema,
    401: commonErrorSchema,
    404: commonErrorSchema,
    405: commonErrorSchema,
    415: commonErrorSchema,
    429: commonErrorSchema,
    500: commonErrorSchema,
    502: commonErrorSchema,
};
