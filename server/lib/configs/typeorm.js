"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeorm = void 0;
const path_1 = __importDefault(require("path"));
const models = path_1.default.resolve(__dirname, '../models');
const migrations = path_1.default.resolve(__dirname, '../migrations');
exports.typeorm = {
    type: 'postgres',
    host: 'localhost',
    database: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    entities: [`${models}/**/*`],
    migrations: [`${migrations}/**/*`],
    synchronize: false,
};
