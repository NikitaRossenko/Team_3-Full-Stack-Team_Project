interface User {
  name: string;
  email: string;
  username: string;
  password: string;
}

function renderProfilUser(user) {
  try {
    const html = `
      <form class="form" action="">
      <div class="title">Name:</div>
      <div class="value">${"user.name"}</div>
      <div class="title">Email:</div>
      <div class="value">${"user.email"}</div>
      <div class="title">UserName:</div>
      <div class="value">${"user.username"}</div>
      <div class="title">Password:</div>
      <div class="value">******</div>
      <div class="title">high score:</div>
      <div class="value">999</div>
      </form>
  `;
    const CardRoot = document.querySelector("#cardRoot");
    if (!CardRoot) throw new Error("CardRoot not found");
    CardRoot.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}
