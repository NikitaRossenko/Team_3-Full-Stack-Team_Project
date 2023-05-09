"use strict";
exports.__esModule = true;
exports.TowerSchema = void 0;
var mongoose_1 = require("mongoose");
// Define interface for Tower document with Mongoose document methods
// Define Mongoose schema for Tower document
exports.TowerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    damage: { type: Number, required: true },
    range: { type: Number, required: true },
    fireRate: { type: Number, required: true },
    cost: { type: Number, required: true },
    level: { type: Number, required: true }
});
var towerModel = mongoose_1["default"].model("tower", exports.TowerSchema);
exports["default"] = towerModel;
