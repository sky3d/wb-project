"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRenga = exports.renga = void 0;
const renga_1 = require("./renga");
let instance = null;
function renga(log, config) {
    instance = new renga_1.Renga(log, config);
    return instance.start();
}
exports.renga = renga;
function getRenga() {
    if (instance instanceof renga_1.Renga) {
        return instance;
    }
    throw new Error('renga is not initialized');
}
exports.getRenga = getRenga;
