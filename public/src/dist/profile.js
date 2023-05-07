function renderProfilUser(user) {
    try {
        var html = "\n      <form class=\"form\" action=\"\">\n      <div class=\"title\">Name:</div>\n      <div class=\"value\">" + "user.name" + "</div>\n      <div class=\"title\">Email:</div>\n      <div class=\"value\">" + "user.email" + "</div>\n      <div class=\"title\">UserName:</div>\n      <div class=\"value\">" + "user.username" + "</div>\n      <div class=\"title\">Password:</div>\n      <div class=\"value\">******</div>\n      <div class=\"title\">high score:</div>\n      <div class=\"value\">999</div>\n      </form>\n  ";
        var CardRoot = document.querySelector("#cardRoot");
        if (!CardRoot)
            throw new Error("CardRoot not found");
        CardRoot.innerHTML = html;
    }
    catch (error) {
        console.error(error);
    }
}
