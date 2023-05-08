interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  highScore?: number;
  coin?: number;
}

function renderScoreUser(user: User) {
    try {
      const html = `
      <li class="person">
        <p class="icon">${'<img class="playericons" src="../images/PlayerIcons/13.png" alt="">'}</p>
        <p class="nickname">#2 - ${"user.userName"}</p>
        <p class="score">${"user.highScore"}</p>
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