"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renga = void 0;
const shortid_1 = __importDefault(require("shortid"));
const interfaces_1 = require("../../interfaces");
const storage_1 = require("../storage");
class Renga {
    constructor(log, config) {
        this.ping = () => 'pong';
        this.log = log;
        this.config = config;
        this.storage = new storage_1.StorageService();
    }
    async start() {
        await this.storage.connect();
        this.log.info('db connected');
        const item = await this.storage.createRenga({
            id: (0, shortid_1.default)(),
            name: 'new draft renga',
            status: interfaces_1.RengaStatus.Draft
        });
        console.log(item);
        this.log.info('renga service initialized');
    }
}
exports.Renga = Renga;
