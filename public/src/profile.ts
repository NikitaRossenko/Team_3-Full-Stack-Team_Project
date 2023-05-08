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

function renderProfilUser(user: User) {
  try {
    const html = `
      <form class="form" action="">
      <div class="title">firstName:</div>
      <div class="value" contenteditable oninput="handleUserUpdate(event,'${user._id}')">${user.firstName}</div>
      <div class="title">lastName:</div>
      <div class="value" contenteditable oninput="handleUserUpdate(event,'${user._id}')">${user.lastName}</div>
      <div class="title">Email:</div>
      <div class="value" contenteditable oninput="handleUserUpdate(event,'${user._id}')">${user.email}</div>
      <div class="title">UserName:</div>
      <div class="value" contenteditable oninput="handleUserUpdate(event,'${user._id}')">${user.userName}</div>
      <div class="title">Password:</div>
      <div class="value" contenteditable oninput="handleUserUpdate(event,'${user._id}')">${user.password}</div>
      <div class="title">high score:</div>
      <div class="value">${user.highScore}</div>
      </form>
  `;
    const CardRoot = document.querySelector("#cardRoot");
    if (!CardRoot) throw new Error("CardRoot not found");
    CardRoot.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

function handelRenderProfilUser() {
  try {
      fetch("/api/users/get-users")
      .then((res) => res.json())
      .then(({ users }) => {
          try {
              if (!users) throw new Error("didnt find users");
            users.forEach(user => {
              renderProfilUser(user);
            });
            } catch (error) {
              console.error(error);
            }
      })
  } catch (error) {
      console.error(error);
  }
   }


   function handleUserUpdate(ev: any, _id: string) {
    try {
      const firstName = ev.target.textContent;
      // const lastName = ev.target.textContent;
      // const Email = ev.target.textContent;
      // const UserName = ev.target.textContent;
      // const Password = ev.target.textContent;
      fetch("/api/users/update-user", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           firstName,
            _id,
            // lastName,
            // Email,
            // UserName,
            // Password
           }),
      });
    } catch (error) {
      console.error(error);
    }
  }