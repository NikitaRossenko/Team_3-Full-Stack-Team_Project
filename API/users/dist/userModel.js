"use strict";
exports.__esModule = true;
exports.UserSchema = exports.ROLE = void 0;
var mongoose_1 = require("mongoose");
var ROLE;
(function (ROLE) {
    ROLE["NORMAL"] = "normal";
    ROLE["ADMIN"] = "admin";
})(ROLE = exports.ROLE || (exports.ROLE = {}));
exports.UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    src: {
        type: String,
        required: true
    },
    highScore: {
        type: String,
        require: false
    },
    coin: {
        type: String,
        require: false
    },
    ROLE: {
        type: String,
        "enum": ROLE,
        "default": ROLE.NORMAL
    }
});
var UserModel = mongoose_1["default"].model("users", exports.UserSchema);
exports["default"] = UserModel;
