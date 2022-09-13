"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("../configs/typeorm");
const renga_1 = require("../models/renga");
class StorageService {
    constructor() {
        this.connect = async () => {
            const conn = await (0, typeorm_1.createConnection)({ ...typeorm_2.typeorm });
            let res;
            try {
                res = await conn.runMigrations();
            }
            catch (e) {
                process.exit(1);
            }
            return conn;
        };
        this.disconnect = async () => {
            try {
                const conn = await (0, typeorm_1.getConnection)();
                await conn.close();
            }
            catch (e) {
            }
        };
        this.createRenga = (data) => {
            const { manager } = (0, typeorm_1.getConnection)();
            const entity = manager.create(renga_1.Renga, data);
            return manager.save(entity);
        };
        this.list = async () => {
            const con = (0, typeorm_1.getRepository)(renga_1.Renga);
            return con.createQueryBuilder().getMany();
        };
    }
}
exports.StorageService = StorageService;
