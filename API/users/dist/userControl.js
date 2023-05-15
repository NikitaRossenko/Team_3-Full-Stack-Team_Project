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
exports.getUser = exports.UpdateUserDetails = exports.login = exports.addUser = exports.deleteUser = exports.UpdateUserDetailById = exports.createUser = exports.getUsers = void 0;
var userModel_1 = require("./userModel");
var jwt_simple_1 = require("jwt-simple");
exports.getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userModel_1["default"].find({})];
            case 1:
                users = _a.sent();
                res.send({ ok: true, users: users });
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
exports.createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, userName, email, password, existUsername, existUserEmail, userDB, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, userName = _a.userName, email = _a.email, password = _a.password;
                return [4 /*yield*/, userModel_1["default"].findOne({ userName: userName })];
            case 1:
                existUsername = _b.sent();
                return [4 /*yield*/, userModel_1["default"].findOne({ email: email })];
            case 2:
                existUserEmail = _b.sent();
                if (existUsername || existUserEmail)
                    throw new Error("User already exist");
                return [4 /*yield*/, userModel_1["default"].create({
                        firstName: firstName,
                        lastName: lastName,
                        userName: userName,
                        email: email,
                        password: password
                    })];
            case 3:
                userDB = _b.sent();
                res.status(201).send({ ok: true, userDB: userDB });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.error(error_2);
                res.status(500).send({ error: error_2.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.UpdateUserDetailById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, updateUser;
    return __generator(this, function (_a) {
        try {
            uid = req.body;
            console.log(uid);
            if (!uid)
                throw new Error("no uID user");
            updateUser = userModel_1["default"].findByIdAndUpdate(uid, {});
            console.log(updateUser);
            res.status(201).send({ ok: true, user: updateUser });
        }
        catch (error) {
            console.error(error);
        }
        return [2 /*return*/];
    });
}); };
exports.deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, deleteUser_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                uid = req.body.uid;
                if (!uid)
                    throw new Error("uID no founded");
                console.log(uid);
                return [4 /*yield*/, userModel_1["default"].findByIdAndDelete(uid)];
            case 1:
                deleteUser_1 = _a.sent();
                console.log(deleteUser_1);
                if (!deleteUser_1)
                    throw new Error("user no founded");
                res.status(201).send({ ok: true, user: deleteUser_1 });
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
exports.addUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
        }
        catch (error) {
            console.error(error);
        }
        return [2 /*return*/];
    });
}); };
exports.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var secret, _a, userName, password, userDB, token, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                secret = process.env.JWT_SECRET;
                _a = req.body, userName = _a.userName, password = _a.password;
                return [4 /*yield*/, userModel_1["default"].findOne({ userName: userName, password: password })];
            case 1:
                userDB = _b.sent();
                if (!userDB) {
                    res.status(401).send({ error: "email or password are inncorect" });
                    return [2 /*return*/];
                }
                if (!secret)
                    throw new Error("Server Error");
                token = jwt_simple_1["default"].encode({ userId: userDB._id }, secret);
                res.cookie("currentUser", token, { httpOnly: true });
                res.status(201).send({ ok: true, userDB: userDB });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                console.error(error_4);
                res.status(500).send({ error: error_4.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.UpdateUserDetails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _id, firstName, lastName, email, userName, password, userDB, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, _id = _a._id, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, userName = _a.userName, password = _a.password;
                return [4 /*yield*/, userModel_1["default"].findByIdAndUpdate(_id, {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        userName: userName,
                        password: password
                    })];
            case 1:
                userDB = _b.sent();
                if (!userDB)
                    throw new Error("No userDB in array");
                res.send({ ok: true });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                console.error(error_5);
                res.status(500).send({ error: error_5.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var secret, currentUser, decoded, userId, userDB, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                secret = process.env.JWT_SECRET || "sddslahkjaskjnbalkjs";
                currentUser = req.cookies.currentUser;
                if (!secret)
                    throw new Error("No secret");
                decoded = jwt_simple_1["default"].decode(currentUser, secret);
                userId = decoded.userId;
                return [4 /*yield*/, userModel_1["default"].findById(userId)];
            case 1:
                userDB = _a.sent();
                res.send({ ok: true, userId: userDB });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error(error_6);
                res.status(500).send({ error: error_6.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
