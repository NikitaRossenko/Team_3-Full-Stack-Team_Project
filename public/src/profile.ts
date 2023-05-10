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
      .then((res) => res.json())
      .then(({ users }) => {
        try {
          if (!users) throw new Error("didnt find users");
          users.forEach(user => {
            // renderProfilUser(user);
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
    ev.preventDefault()
    const { lName, fName, password, userName, email } = ev.target.elements;
    console.log(lName.value);
    fetch("/api/users/update-user", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      _id ,
      firstName: fName.value,
        lastName: lName.value,
        password: password.value,
        userName: userName.value,
        email: email.value
      }),
    });
  } catch (error) {
    console.error(error);
  }
}


async function handleGetUser() {
  try {
    const response = await fetch('/api/users/get-user');
    const data = await response.json();
    const { userId } = data;
    const html = `
      <form class="form" action="" method="get" onsubmit="handleUserUpdate(event, '${userId._id}')">
      <label class="title">firstName:</label>
      <input id="fName" class="value" contenteditable value="${userId.firstName}"></input>
      <label class="title">lastName:</label>
      <input id="lName" class="value" contenteditable value="${userId.lastName}" ></input>
      <label class="title">Email:</label>
      <input id="email" class="value" contenteditable value="${userId.email}"></input>
      <label class="title">UserName:</label>
      <input  id="userName"class="value" contenteditable value="${userId.userName}"></input>
      <label class="title">Password:</label>
      <input id="password" class="value" contenteditable value="${userId.password}"></input>
      <label class="title">high score:</label>
      <div id="highScore" class="value">${userId.highScore?userId.highScore:0}</div>
      <button type="submit"> Update</button>
      </form>
  `;
    const CardRoot = document.querySelector("#cardRoot");
    if (!CardRoot) throw new Error("CardRoot not found");
    CardRoot.innerHTML = html
  } catch (error) {
    console.error(error);
  }
}
