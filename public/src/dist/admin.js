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
var totalGamesPlayedFill = document.getElementById('totalGamesPlayedFill'); // Fill Total Games Number 
var versionFill = document.getElementById('versionFill'); // Fill Version Number
var onLoad = function () {
    try {
        renderUserList();
        FillAdminName();
        FillRegisteredUsers();
    }
    catch (error) {
    }
};
// View 
function renderCreateTowerSection() {
    try {
        var html = "\n    <div onclick=\"handleClickCloseCollapseContainer()\" id=\"closeIcon\" class=\"collapse-container__close\">\n    <i class=\"fa-solid fa-xmark\"></i>\n</div>\n<h2 class=\"collapse-container__title\">create Tower</h2>\n<form class=\"collapse-container__form\" onsubmit=\"handleSubmitCreateTower(event)\">\n\n    <div>\n        <label for=\"name\" >tower name</label>\n        <input type=\"text\" name=\"name\" id=\"name\" >\n    </div>\n    <div>\n        <label for=\"type\" >tower type</label>\n        <input type=\"text\" name=\"type\" id=\"type\">\n    </div>\n    <div>\n        <label for=\"damage\" >damage</label>\n        <input type=\"number\" name=\"damage\" id=\"damage\" >\n    </div>\n    <div>\n        <label for=\"range\" > range</label>\n        <input type=\"number\" name=\"range\" min=\"0\" max=\"100\" >\n    </div>\n    <div>\n        <label for=\"fireRate\" > fire Rate</label>\n        <input type=\"number\" name=\"fireRate\" id=\"fireRate\" >\n    </div>\n    <div>\n        <label for=\"cost\" >cost</label>\n        <input type=\"number\" name=\"cost\" id=\"cost\" >\n    </div>\n    <button type=\"submit\">Create Now</button>\n</form>";
        return html;
    }
    catch (error) {
        console.error(error);
        return 'We Have A Problem Here';
    }
}
function renderCreateEnemySection() {
    try {
        var html = "\n    <div onclick=\"handleClickCloseCollapseContainer()\" id=\"closeIcon\" class=\"collapse-container__close\">\n    <i class=\"fa-solid fa-xmark\"></i>\n</div>\n<h2 class=\"collapse-container__title\">Create Enemy</h2>\n<form class=\"collapse-container__form\" onsubmit=\"handleSubmitCreateEnemy(event)\">\n\n    <div>\n        <label for=\"name\" >Enemy Name</label>\n        <input type=\"text\" name=\"name\" id=\"name\">\n    </div>\n    <div>\n        <label for=\"type\" >Enemy Type</label>\n        <input type=\"text\" name=\"type\" id=\"type\">\n    </div>\n    <div>\n        <label for=\"health\" >Health</label>\n        <input type=\"number\" name=\"health\" id=\"health\">\n    </div>\n    <div>\n        <label for=\"damage\" > Damage</label>\n        <input type=\"number\" name=\"damage\" >\n    </div>\n    <div>\n        <label for=\"speed\" > Fire Rate</label>\n        <input type=\"number\" name=\"speed\" id=\"speed\">\n    </div>\n\n    <button type=\"submit\">Create Now</button>\n</form>";
        return html;
    }
    catch (error) {
        console.error(error);
        return 'We Have A Problem Here';
    }
}
function renderCreateUserSection() {
    try {
        var html = "\n    <div onclick=\"handleClickCloseCollapseContainer()\" id=\"closeIcon\" class=\"collapse-container__close\">\n    <i class=\"fa-solid fa-xmark\"></i>\n</div>\n<h2 class=\"collapse-container__title\">Create User</h2>\n<form class=\"collapse-container__form\" onsubmit=\"handleSubmitCreateUser(event)\">\n\n    <div>\n        <label for=\"fname\" >First Name</label>\n        <input type=\"text\" name=\"fname\" id=\"fname\">\n    </div>\n    <div>\n        <label for=\"lname\" >Last Name</label>\n        <input type=\"text\" name=\"lname\" id=\"lname\">\n    </div>\n    <div>\n        <label for=\"email\" >Email</label>\n        <input type=\"text\" name=\"email\" id=\"email\">\n    </div>\n    <div>\n        <label for=\"userName\" > range</label>\n        <input type=\"text\" name=\"userName\" id=\"userName\">\n    </div>\n    <div>\n        <label for=\"password\" >Password</label>\n        <input type=\"text\" name=\"password\" id=\"password\">\n    </div>\n    <div>\n        <label for=\"cPassword\" >Confirm Password</label>\n        <input type=\"text\" name=\"cPassword\" id=\"cPassword\">\n    </div>\n    <div>\n        <label for=\"role\" >ROLE</label>\n       <select id=\"role\" name=\"role\">\n       <option value=\"public\" >Public</option>\n       <option value=\"admin\" >Admin</option>\n       </select>\n    </div>\n    <button type=\"submit\">Create Now</button>\n</form>";
        return html;
    }
    catch (error) {
        console.error(error);
        return 'We Have A Problem Here';
    }
}
// RENDER USERS LIST
function renderUserList() {
    return __awaiter(this, void 0, void 0, function () {
        var rootUsersDetail, dataJs, data, users, html, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    rootUsersDetail = document.getElementById('rootUsersDetail');
                    return [4 /*yield*/, fetch('/api/users/get-users')];
                case 1:
                    dataJs = _a.sent();
                    if (!dataJs)
                        throw new Error('no found dataJs');
                    return [4 /*yield*/, dataJs.json()];
                case 2:
                    data = _a.sent();
                    users = data.users;
                    console.log(users);
                    html = users.map(function (user) {
                        return "\n            <li class=\"container__main__container-middle__list\">\n            <div>\n                <h5>Username</h5>\n                <span id=\"rootNameUser\">" + user.userName + "</span>\n            </div>\n            <div>\n                <h5>Email</h5>\n                <span id=\"rootNameUser\">" + user.email + "</span>\n            </div>\n            <div>\n                <h5>Role</h5>\n                <span id=\"rootNameUser\">" + user.ROLE + "</span>\n            </div>\n            <div>\n                <button onclick=\"handleClickDelUser('" + user._id + "')\">\n                    <i class=\"fa-solid fa-trash-can\"></i>\n                </button>\n            </div>\n        </li>\n\n            ";
                    }).join('');
                    console.log(rootUsersDetail);
                    rootUsersDetail.innerHTML = html;
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//RENDER TOWER LISTS
function renderTowerList(adminID) {
    return __awaiter(this, void 0, void 0, function () {
        var rootUsersDetail, dataJs, data, towers, html, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    rootUsersDetail = document.getElementById('rootUsersDetail');
                    return [4 /*yield*/, fetch('/api/towers/get-towers')];
                case 1:
                    dataJs = _a.sent();
                    if (!dataJs)
                        throw new Error('no found dataJs');
                    return [4 /*yield*/, dataJs.json()];
                case 2:
                    data = _a.sent();
                    towers = data.towers;
                    html = towers.map(function (user) {
                        return "\n            <li class=\"container__main__container-middle__list\">\n            <div>\n                <h5>Username</h5>\n                <span id=\"rootNameUser\"></span>\n            </div>\n            <div>\n                <h5>Email</h5>\n                <span id=\"rootNameUser\"></span>\n            </div>\n            <div>\n                <button onclick=\"handleClickDelTower(" + adminID + ")\">\n                    <i class=\"fa-solid fa-trash-can\"></i>\n                </button>\n            </div>\n        </li>\n\n            ";
                    }).join('');
                    console.log(rootUsersDetail);
                    rootUsersDetail.innerHTML = html;
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//RENDER ENEMY LISTS
function renderEnemyList(adminID) {
    return __awaiter(this, void 0, void 0, function () {
        var rootUsersDetail, dataJs, data, enemy, html, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    rootUsersDetail = document.getElementById('rootUsersDetail');
                    return [4 /*yield*/, fetch('/api/enemy/get-enemy')];
                case 1:
                    dataJs = _a.sent();
                    if (!dataJs)
                        throw new Error('no found dataJs');
                    return [4 /*yield*/, dataJs.json()];
                case 2:
                    data = _a.sent();
                    enemy = data.enemy;
                    html = enemy.map(function (ene) {
                        return "\n            <li class=\"container__main__container-middle__list\">\n            <div>\n                <h5>Enemy Name</h5>\n                <span id=\"rootNameUser\">" + ene.name + "</span>\n            </div>\n            <div>\n                <h5>Type</h5>\n                <span id=\"rootNameUser\">" + ene.type + "</span>\n            </div>\n            <div>\n                <button onclick=\"handleClickDelUser(" + adminID + ")\">\n                    <i class=\"fa-solid fa-trash-can\"></i>\n                </button>\n            </div>\n        </li>\n\n            ";
                    }).join('');
                    console.log(rootUsersDetail);
                    rootUsersDetail.innerHTML = html;
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Control
function handleSubmitCreateTower(ev) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
            }
            catch (error) {
                console.error(error);
            }
            return [2 /*return*/];
        });
    });
}
function handleSubmitCreateEnemy(ev) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
            }
            catch (error) {
                console.error(error);
            }
            return [2 /*return*/];
        });
    });
}
function handleSubmitCreateUser(ev) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
            }
            catch (error) {
                console.error(error);
            }
            return [2 /*return*/];
        });
    });
}
function handleClickDelUser(userID) {
    return __awaiter(this, void 0, void 0, function () {
        var deleteUser, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (!confirm("Are you sure you want to delete the above user?")) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetch('/api/users/delete-user', {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                uid: userID
                            })
                        }).then(function (data) {
                            console.log(data);
                        })];
                case 1:
                    deleteUser = _a.sent();
                    location.reload();
                    _a.label = 2;
                case 2: return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error(error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function handleClickDelTower(towerID) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                console.log("delete Users");
            }
            catch (error) {
                console.error(error);
            }
            return [2 /*return*/];
        });
    });
}
// Click  return back button
function handleClickBack() {
    try {
        window.location.href = "/";
    }
    catch (error) {
        console.error(error);
    }
}
function handleClickCloseCollapseContainer() {
    try {
        var collapseFormRoot = document.getElementById('collapseFormRoot');
        collapseFormRoot.classList.remove('active');
    }
    catch (error) {
        console.error(error);
    }
}
// bottom Buttons
function handleClickCreateTowerBtn() {
    try {
        var collapseFormRoot = document.getElementById('collapseFormRoot');
        collapseFormRoot.classList.add('active');
        collapseFormRoot.innerHTML = renderCreateTowerSection();
    }
    catch (error) {
        console.error(error);
    }
}
function handleClickCreateEnemyBtn() {
    try {
        var collapseFormRoot = document.getElementById('collapseFormRoot');
        collapseFormRoot.classList.add('active');
        collapseFormRoot.innerHTML = renderCreateEnemySection();
    }
    catch (error) {
        console.error(error);
    }
}
function handleClickCreateUserBtn() {
    try {
        var collapseFormRoot = document.getElementById('collapseFormRoot');
        collapseFormRoot.classList.add('active');
        collapseFormRoot.innerHTML = renderCreateUserSection();
    }
    catch (error) {
        console.error(error);
    }
}
// FILL STATS 
function FillRegisteredUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var registeredUserFill, dataJs, data, userNumber, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    registeredUserFill = document.getElementById('registeredUserFill') // Fill Registered Users Number
                    ;
                    return [4 /*yield*/, fetch('/api/users/get-users')];
                case 1:
                    dataJs = _a.sent();
                    if (!dataJs)
                        throw new Error("no found DataJsName");
                    return [4 /*yield*/, dataJs.json()];
                case 2:
                    data = _a.sent();
                    userNumber = data.users.length.toString();
                    registeredUserFill.innerHTML = userNumber;
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    console.error();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function FillAdminName() {
    return __awaiter(this, void 0, void 0, function () {
        var nameAdminFill, dataJs, data, name, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    nameAdminFill = document.getElementById('nameAdminFill') // Fill Name Admin
                    ;
                    return [4 /*yield*/, fetch('/api/users/get-user')];
                case 1:
                    dataJs = _a.sent();
                    if (!dataJs)
                        throw new Error("no found DataJsName");
                    return [4 /*yield*/, dataJs.json()];
                case 2:
                    data = _a.sent();
                    name = data.userId.firstName;
                    nameAdminFill.innerHTML = name;
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    console.error();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
