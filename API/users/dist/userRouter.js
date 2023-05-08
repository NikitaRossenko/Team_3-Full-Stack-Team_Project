"use strict";
exports.__esModule = true;
var express_1 = require("express");
var userControl_1 = require("./userControl");
var userRouter = express_1.Router();
userRouter
    .get("get-users", userControl_1.getUsers)
    .post("create-user", userControl_1.createUser)["delete"]("delete-user", userControl_1.UpdateUserDetailById);
exports["default"] = userRouter;
