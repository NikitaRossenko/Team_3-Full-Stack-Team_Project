function renderScoreUser(user) {
    try {
        var html = "\n      <li class=\"person\">\n        <p class=\"icon\">" + '<img class="playericons" src="../images/PlayerIcons/13.png" alt="">' + "</p>\n        <p class=\"nickname\">#2 - " + "nickname" + "</p>\n        <p class=\"score\">" + "score" + "</p>\n        <ul class=\"point-btns\"></ul>\n      </li>\n    ";
        var ScoreRoot = document.querySelector("#scoreRoot");
        if (!ScoreRoot)
            throw new Error("ScoreRoot not found");
        ScoreRoot.innerHTML += html;
    }
    catch (error) {
        console.error(error);
    }
}
