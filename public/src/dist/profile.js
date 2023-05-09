// interface User {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   userName: string;
//   email: string;
//   password: string;
//   highScore?: number;
//   coin?: number;
// }
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
// function renderProfilUser(user: User) {
//   try {
//     const html = `
//       <form class="form" action="">
//       <div class="title">firstName:</div>
//       <div class="value" contenteditable oninput="handleUserUpdate(event,'${user._id}')">${user.firstName}</div>
//       <div class="title">lastName:</div>
//       <div class="value" contenteditable oninput="handleUserUpdate(event,'${user._id}')">${user.lastName}</div>
//       <div class="title">Email:</div>
//       <div class="value" contenteditable oninput="handleUserUpdate(event,'${user._id}')">${user.email}</div>
//       <div class="title">UserName:</div>
//       <div class="value" contenteditable oninput="handleUserUpdate(event,'${user._id}')">${user.userName}</div>
//       <div class="title">Password:</div>
//       <div class="value" contenteditable oninput="handleUserUpdate(event,'${user._id}')">${user.password}</div>
//       <div class="title">high score:</div>
//       <div class="value">${user.highScore}</div>
//       </form>
//   `;
//     const CardRoot = document.querySelector("#cardRoot");
//     if (!CardRoot) throw new Error("CardRoot not found");
//     CardRoot.innerHTML = html;
//   } catch (error) {
//     console.error(error);
//   }
// }
function handelRenderProfilUser() {
    try {
        fetch("/api/users/get-users")
            .then(function (res) { return res.json(); })
            .then(function (_a) {
            var users = _a.users;
            try {
                if (!users)
                    throw new Error("didnt find users");
                users.forEach(function (user) {
                    // renderProfilUser(user);
                });
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    catch (error) {
        console.error(error);
    }
}
function handleUserUpdate(ev, _id) {
    try {
        var firstName = ev.target.textContent;
        // const lastName = ev.target.textContent;
        // const Email = ev.target.textContent;
        // const UserName = ev.target.textContent;
        // const Password = ev.target.textContent;
        fetch("/api/users/update-user", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                _id: _id
            })
        });
    }
    catch (error) {
        console.error(error);
    }
}
function handleGetUser() {
    return __awaiter(this, void 0, void 0, function () {
        var responce, data, currentUser, html, CardRoot, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/api/users/get-user')];
                case 1:
                    responce = _a.sent();
                    return [4 /*yield*/, responce.json()];
                case 2:
                    data = _a.sent();
                    currentUser = data.currentUser;
                    html = "\n      <form class=\"form\" action=\"\">\n      <div class=\"title\">firstName:</div>\n      <div class=\"value\" contenteditable oninput=\"handleUserUpdate(event,'" + currentUser._id + "')\">" + currentUser.firstName + "</div>\n      <div class=\"title\">lastName:</div>\n      <div class=\"value\" contenteditable oninput=\"handleUserUpdate(event,'" + currentUser._id + "')\">" + currentUser.lastName + "</div>\n      <div class=\"title\">Email:</div>\n      <div class=\"value\" contenteditable oninput=\"handleUserUpdate(event,'" + currentUser._id + "')\">" + currentUser.email + "</div>\n      <div class=\"title\">UserName:</div>\n      <div class=\"value\" contenteditable oninput=\"handleUserUpdate(event,'" + currentUser._id + "')\">" + currentUser.userName + "</div>\n      <div class=\"title\">Password:</div>\n      <div class=\"value\" contenteditable oninput=\"handleUserUpdate(event,'" + currentUser._id + "')\">" + currentUser.password + "</div>\n      <div class=\"title\">high score:</div>\n      <div class=\"value\">" + currentUser.highScore + "</div>\n      </form>\n  ";
                    CardRoot = document.querySelector("#cardRoot");
                    if (!CardRoot)
                        throw new Error("CardRoot not found");
                    CardRoot.innerHTML = html;
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
