"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renga = void 0;
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
        this.log.info('renga service initialized');
    }
}
exports.Renga = Renga;
