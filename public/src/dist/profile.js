function renderProfilUser(user) {
    try {
        var html = "\n      <form class=\"form\" action=\"\">\n      <div class=\"title\">firstName:</div>\n      <div class=\"value\" contenteditable oninput=\"handleUserUpdate(event,'" + user._id + "')\">" + user.firstName + "</div>\n      <div class=\"title\">lastName:</div>\n      <div class=\"value\" contenteditable oninput=\"handleUserUpdate(event,'" + user._id + "')\">" + user.lastName + "</div>\n      <div class=\"title\">Email:</div>\n      <div class=\"value\" contenteditable oninput=\"handleUserUpdate(event,'" + user._id + "')\">" + user.email + "</div>\n      <div class=\"title\">UserName:</div>\n      <div class=\"value\" contenteditable oninput=\"handleUserUpdate(event,'" + user._id + "')\">" + user.userName + "</div>\n      <div class=\"title\">Password:</div>\n      <div class=\"value\" contenteditable oninput=\"handleUserUpdate(event,'" + user._id + "')\">" + user.password + "</div>\n      <div class=\"title\">high score:</div>\n      <div class=\"value\">" + user.highScore + "</div>\n      </form>\n  ";
        var CardRoot = document.querySelector("#cardRoot");
        if (!CardRoot)
            throw new Error("CardRoot not found");
        CardRoot.innerHTML = html;
    }
    catch (error) {
        console.error(error);
    }
}
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
                    renderProfilUser(user);
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
