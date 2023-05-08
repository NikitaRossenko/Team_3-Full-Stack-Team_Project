"use strict";
exports.__esModule = true;
var express_1 = require("express");
var cookieParser = require('cookie-parser');
var app = express_1["default"]();
app.use(cookieParser());
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv");
dotenv.config();
app.use(express_1["default"].json());
var uri = process.env.MONGO_DB;
if (uri) {
    mongoose_1["default"]
        .connect(uri)
        .then(function () {
        console.log("DB connected!");
    })["catch"](function (err) { return console.log(err); });
}
else {
    console.log("No URI to DB");
}
app.use(express_1["default"].static("./public"));
app.use(express_1["default"].static("./public/pages"));
app.listen(3000, function () {
    console.log("server listen on port 3000");
});
