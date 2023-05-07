"use strict";
exports.__esModule = true;
var express_1 = require("express");
// const cookieParser = require('cookie-parser')
var app = express_1["default"]();
// app.use(cookieParser())
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv"); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
app.use(express_1["default"].json());
var uri = process.env.MONGODB_URI;
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
