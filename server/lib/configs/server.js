"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const env_schema_1 = __importDefault(require("env-schema"));
const schema = {
    type: 'object',
    required: ['PORT'],
    properties: {
        PORT: {
            type: 'number',
            default: 3000,
        },
        HOST: {
            type: 'string',
            default: '127.0.0.1',
        },
    },
};
exports.envConfig = (0, env_schema_1.default)({
    dotenv: true,
    schema,
});
