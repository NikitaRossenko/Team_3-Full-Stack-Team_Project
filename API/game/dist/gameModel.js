"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var towerModel_1 = require("../towers/towerModel");
var enemyModel_1 = require("../enemy/enemyModel");
var userModel_1 = require("../users/userModel");
var GameSchema = new mongoose_1.Schema({
    player: userModel_1.UserSchema,
    score: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    towers: [towerModel_1.TowerSchema],
    enemies: [enemyModel_1.EnemySchema]
});
var GameModel = mongoose_1["default"].model("game", GameSchema);
exports["default"] = GameModel;
