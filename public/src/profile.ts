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
fillContainerIcon()
getSrcFromCurrentUser()
async function getSrcFromCurrentUser() {
  try {
    const profileImgElement:HTMLElement | null = document.querySelector(".profile-image img"); // Fill Name Admin;
   if(!profileImgElement) throw new Error("no found IMG element")
    const dataJs = await fetch("/api/users/get-user");
    if (!dataJs) throw new Error("no found DataJsName");
    const data = await dataJs.json();
    console.log(data);
    const src = data.user.src;
    if(!src) return console.log("no found src");
    profileImgElement.setAttribute("src" , src )
  } catch (error) {
    console.error();
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
        email: email.value ,
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
    const { user } = data;
    const html = `
      <form class="form" action="" method="get" onsubmit="handleUserUpdate(event, '${user._id}')">
      <label class="title">firstName:</label>
      <input id="fName" class="value" contenteditable value="${user.firstName}"></input>
      <label class="title">lastName:</label>
      <input id="lName" class="value" contenteditable value="${user.lastName}" ></input>
      <label class="title">Email:</label>
      <input id="email" class="value" contenteditable value="${user.email}"></input>
      <label class="title">UserName:</label>
      <input  id="userName"class="value" contenteditable value="${user.userName}"></input>
      <label class="title">Password:</label>
      <input id="password" class="value" contenteditable value="${user.password}"></input>
      <label class="title">high score:</label>
      <div id="highScore" class="value">${user.highScore?user.highScore:0}</div>
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

function handleClickChangeIcon(){
  try {
    const collapseContainer:HTMLElement | null = document.querySelector('.collapseContainerChooseProfileImage')
    if(!collapseContainer) throw new Error("no found collapse Container Element")
    collapseContainer.classList.toggle('active')
  } catch (error) {
    console.error(error)
  }
}

function fillContainerIcon(){
  try {
    const collapseContainer:HTMLElement | null = document.querySelector('.collapseContainerChooseProfileImage')
    if(!collapseContainer) throw new Error("no found collapse Container Element")
      let html = ''
    for(let i = 1 ; i <= 48 ; i++ ){
      html += `<img class="iconProfile" src='../images/PlayerIcons/${i}.png' onclick='handleClickIcon(event)'>`
    }
    collapseContainer.innerHTML = html
  } catch (error) {
    console.error(error)
  }
} 

async function handleClickIcon(event:any){
  try {
    let number =  Number(event.target.src.slice(-6 , -4))
    if(!Number(number)){
      number  = Number(event.target.src.slice(-5 , -4))
    } 
    await fetch('/api/users/change-icon' ,{
      method: 'PATCH',
      body: JSON.stringify({
        src:`../images/PlayerIcons/${number.toString()}.png`,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
      fillContainerIcon()
      location.reload()
  } catch (error) {
    console.error(error)
  }
}