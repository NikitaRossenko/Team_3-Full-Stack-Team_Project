"use strict";
exports.__esModule = true;
var express_1 = require("express");
var gameControl_1 = require("./gameControl");
var gameRouter = express_1.Router();
gameRouter
    .get("/get-games", gameControl_1.getGames)
    .get("/create-game", gameControl_1.createGame)
    .post("/increase-highscore", gameControl_1.increaseHighscore);
exports["default"] = gameRouter;