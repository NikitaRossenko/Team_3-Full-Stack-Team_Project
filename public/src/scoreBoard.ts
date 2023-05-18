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

async function renderScoreUser() {
    try {
      const response = await fetch('/api/users/get-user');
      const data = await response.json();
      const { user } = data;
      const html = `
      <li class="person">
        <p class="icon"><img class="playericons" src=${user.src}></p>
        <p class="nickname">#2 - ${user.userName}</p>
        <p class="score">${user.highScore?user.highScore:0}</p>
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