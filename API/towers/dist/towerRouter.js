"use strict";
exports.__esModule = true;
var express_1 = require("express");
var towerControl_1 = require("./towerControl");
var towerRouter = express_1.Router();
towerRouter
    .get("/get-towers", towerControl_1.getTowers)
    .post("/create-tower", towerControl_1.createTower);
exports["default"] = towerRouter;
