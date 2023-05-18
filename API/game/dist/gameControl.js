"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.createGame = exports.getGameCoins = exports.increaseHighscore = exports.getGames = void 0;
var enemyModel_1 = require("../enemy/enemyModel");
var towerModel_1 = require("../towers/towerModel");
var userModel_1 = require("../users/userModel");
var gameModel_1 = require("./gameModel");
var jwt_simple_1 = require("jwt-simple");
exports.getGames = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var gamesDB, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, gameModel_1["default"].find({})
                        .populate(["enemies", "towers"])
                        .populate({ path: "player", select: "-password" })];
            case 1:
                gamesDB = _a.sent();
                res.send({ ok: true, gamesDB: gamesDB });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).send({ ok: false });
                console.error(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.increaseHighscore = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUser, score, secret, userId, user, updatedHighscore, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                currentUser = req.cookies.currentUser;
                score = req.body.score;
                secret = process.env.JWT_SECRET;
                if (!secret)
                    throw new Error("Server Error");
                userId = jwt_simple_1["default"].decode(currentUser, secret).userId;
                return [4 /*yield*/, userModel_1["default"].findOne({ _id: userId })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new Error("Server Error");
                if (!(user.highScore < score)) return [3 /*break*/, 3];
                return [4 /*yield*/, userModel_1["default"].findOneAndUpdate({ _id: userId }, { highScore: score })];
            case 2:
                updatedHighscore = _a.sent();
                _a.label = 3;
            case 3:
                res.status(200).send({ ok: true });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                res.status(500).send({ ok: false });
                console.error(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getGameCoins = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentGame, secret, gameId, game, coinsDB, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                currentGame = req.cookies.currentGame;
                secret = process.env.JWT_SECRET;
                if (!secret)
                    throw new Error("Server Error");
                gameId = jwt_simple_1["default"].decode(currentGame, secret).gameId;
                return [4 /*yield*/, gameModel_1["default"].findOne({ _id: gameId }).lean()];
            case 1:
                game = _a.sent();
                if (!game)
                    throw new Error("Server Error");
                coinsDB = game.coins;
                console.log(coinsDB);
                res.status(200).send({ ok: coinsDB });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).send({ ok: false });
                console.error(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
//creat game -> playerId = userid
//creat game -> enemiesId[].map
//creat game -> towersId[].map
exports.createGame = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUser, secret, userId, user, increasedGamePlayed, enemies, towers, gameDB, _id, gameToken, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                currentUser = req.cookies.currentUser;
                secret = process.env.JWT_SECRET;
                if (!secret)
                    throw new Error("Server Error");
                return [4 /*yield*/, jwt_simple_1["default"].decode(currentUser, secret)];
            case 1:
                userId = (_a.sent()).userId;
                return [4 /*yield*/, userModel_1["default"].findOne({ _id: userId }).lean()];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new Error("Server Error");
                return [4 /*yield*/, userModel_1["default"].findOneAndUpdate({ _id: userId }, { gamesPlayed: user.gamesPlayed + 1 })];
            case 3:
                increasedGamePlayed = _a.sent();
                return [4 /*yield*/, enemyModel_1["default"].find({}).lean()];
            case 4:
                enemies = _a.sent();
                return [4 /*yield*/, towerModel_1["default"].find({}).lean()];
            case 5:
                towers = _a.sent();
                return [4 /*yield*/, gameModel_1["default"].create({
                        player: userId,
                        enemies: enemies,
                        towers: towers,
                        score: 0,
                        coins: 100,
                        waveCount: 1
                    })];
            case 6:
                gameDB = _a.sent();
                _id = gameDB._id;
                return [4 /*yield*/, jwt_simple_1["default"].encode({ gameId: _id }, secret)];
            case 7:
                gameToken = _a.sent();
                res.cookie("currentGame", gameToken);
                res.status(201).send({ ok: true });
                return [3 /*break*/, 9];
            case 8:
                error_4 = _a.sent();
                console.error(error_4);
                res.status(500).send({ error: error_4.message });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
