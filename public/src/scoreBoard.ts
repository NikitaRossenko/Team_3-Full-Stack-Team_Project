 interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  highScore: number;
  ROLE: ROLE;
  gamesPlayed:number;
  src?:string
}

function renderScoreUser(user: User){
    try {

      const html = `
      <li class="person">
        <p class="icon"><img class="playericons" src=${user.src}></p>
        <p class="nickname">${user.userName}</p>
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


  async function handelRnderScoreUser(){
    const response = await fetch('/api/users/get-users');
    const data = await response.json();
    const { users } = data;
    console.log(users);
    if(!users) return
    users.forEach(renderScoreUser);
  }