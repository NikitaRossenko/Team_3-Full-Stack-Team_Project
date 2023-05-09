"use strict";
exports.__esModule = true;
exports.EnemySchema = void 0;
var mongoose_1 = require("mongoose");
exports.EnemySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    health: { type: Number, required: true },
    damage: { type: Number, required: true },
    speed: { type: Number, required: true },
    level: { type: Number, required: true },
    location: { type: String, required: true }
});
var enemyModel = mongoose_1["default"].model("enemies", exports.EnemySchema);
exports["default"] = enemyModel;
