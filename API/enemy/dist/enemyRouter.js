"use strict";
exports.__esModule = true;
var express_1 = require("express");
var enemyControl_1 = require("./enemyControl");
var enemyRouter = express_1.Router();
enemyRouter
    .get("/get-enemies", enemyControl_1.getEnemies)
    .post("/create-enemy", enemyControl_1.createEnemy);
exports["default"] = enemyRouter;
