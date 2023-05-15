"use strict";
exports.__esModule = true;
var express_1 = require("express");
var userControl_1 = require("./userControl");
var userRouter = express_1.Router();
userRouter
    .get("/get-users", userControl_1.getUsers)
    .post("/create-user", userControl_1.createUser)
    .post("/admin-create-user", userControl_1.adminCreateUser)
    .post("/login", userControl_1.login)
    .put("/update-user", userControl_1.UpdateUserDetails)
    .get("/get-user", userControl_1.getUser)["delete"]("/delete-user", userControl_1.deleteUser);
exports["default"] = userRouter;
