"use strict";
exports.__esModule = true;
var express_1 = require("express");
var gameControl_1 = require("./gameControl");
var gameRouter = express_1.Router();
gameRouter
    .get("/get-games", gameControl_1.getGames);
// .post("/creat-game" ,createGame )
exports["default"] = gameRouter;
