function renderScoreUser(user) {
    try {
      const html = `
      <li class="person">
        <p class="icon">${'<img class="playericons" src="../images/PlayerIcons/13.png" alt="">'}</p>
        <p class="nickname">#2 - ${"nickname"}</p>
        <p class="score">${"score"}</p>
        <ul class="point-btns"></ul>
      </li>
    `;
      const ScoreRoot = document.querySelector("#scoreRoot");
      if (!ScoreRoot) throw new Error("ScoreRoot not found");
      ScoreRoot.innerHTML += html;
    } catch (error) {
      console.error(error);
    }
  }