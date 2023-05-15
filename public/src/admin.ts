
const totalGamesPlayedFill: HTMLElement = document.getElementById('totalGamesPlayedFill')! // Fill Total Games Number 
const versionFill: HTMLElement = document.getElementById('versionFill')! // Fill Version Number



const onLoad = () =>{
try {
    renderUserList()
    FillAdminName()
    FillRegisteredUsers()
} catch (error) {
    
}
}

// View 

function renderCreateTowerSection():string{
try {
    const html = `
    <div onclick="handleClickCloseCollapseContainer()" id="closeIcon" class="collapse-container__close">
    <i class="fa-solid fa-xmark"></i>
</div>
<h2 class="collapse-container__title">create Tower</h2>
<form class="collapse-container__form" onsubmit="handleSubmitCreateTower(event)">

    <div>
        <label for="name" >tower name</label>
        <input type="text" name="name" id="name" >
    </div>
    <div>
        <label for="type" >tower type</label>
        <input type="text" name="type" id="type">
    </div>
    <div>
        <label for="damage" >damage</label>
        <input type="number" name="damage" id="damage" >
    </div>
    <div>
        <label for="range" > range</label>
        <input type="number" name="range" min="0" max="100" >
    </div>
    <div>
        <label for="fireRate" > fire Rate</label>
        <input type="number" name="fireRate" id="fireRate" >
    </div>
    <div>
        <label for="cost" >cost</label>
        <input type="number" name="cost" id="cost" >
    </div>
    <button type="submit">Create Now</button>
</form>`
return html
} catch (error) {
    console.error(error)
    return 'We Have A Problem Here'
}
}
function renderCreateEnemySection():string{
try {
    const html = `
    <div onclick="handleClickCloseCollapseContainer()" id="closeIcon" class="collapse-container__close">
    <i class="fa-solid fa-xmark"></i>
</div>
<h2 class="collapse-container__title">Create Enemy</h2>
<form class="collapse-container__form" onsubmit="handleSubmitCreateEnemy(event)">

    <div>
        <label for="name" >Enemy Name</label>
        <input type="text" name="name" id="name">
    </div>
    <div>
        <label for="type" >Enemy Type</label>
        <input type="text" name="type" id="type">
    </div>
    <div>
        <label for="health" >Health</label>
        <input type="number" name="health" id="health">
    </div>
    <div>
        <label for="damage" > Damage</label>
        <input type="number" name="damage" >
    </div>
    <div>
        <label for="speed" > Fire Rate</label>
        <input type="number" name="speed" id="speed">
    </div>

    <button type="submit">Create Now</button>
</form>`
return html
} catch (error) {
    console.error(error)
    return 'We Have A Problem Here'
}
}
function renderCreateUserSection():string{
try {
    const html = `
    <div onclick="handleClickCloseCollapseContainer()" id="closeIcon" class="collapse-container__close">
    <i class="fa-solid fa-xmark"></i>
</div>
<h2 class="collapse-container__title">Create User</h2>
<form class="collapse-container__form" onsubmit="handleSubmitCreateUser(event)">

    <div>
        <label for="fname" >First Name</label>
        <input type="text" name="fname" id="fname">
    </div>
    <div>
        <label for="lname" >Last Name</label>
        <input type="text" name="lname" id="lname">
    </div>
    <div>
        <label for="email" >Email</label>
        <input type="text" name="email" id="email">
    </div>
    <div>
        <label for="userName" > range</label>
        <input type="text" name="userName" id="userName">
    </div>
    <div>
        <label for="password" >Password</label>
        <input type="text" name="password" id="password">
    </div>
    <div>
        <label for="cPassword" >Confirm Password</label>
        <input type="text" name="cPassword" id="cPassword">
    </div>
    <div>
        <label for="role" >ROLE</label>
       <select id="role" name="role">
       <option value="public" >Public</option>
       <option value="admin" >Admin</option>
       </select>
    </div>
    <button type="submit">Create Now</button>
</form>`
return html
} catch (error) {
    console.error(error)
    return 'We Have A Problem Here'
}
}

// RENDER USERS LIST
async function renderUserList() {
    try {
        const rootUsersDetail: HTMLElement = document.getElementById('rootUsersDetail')!
        const dataJs = await fetch('/api/users/get-users')
        if (!dataJs) throw new Error('no found dataJs')
        const data = await dataJs.json();
        const { users } = data
        console.log(users);
        const html = users.map(user => {
            return `
            <li class="container__main__container-middle__list">
            <div>
                <h5>Username</h5>
                <span id="rootNameUser">${user.userName}</span>
            </div>
            <div>
                <h5>Email</h5>
                <span id="rootNameUser">${user.email}</span>
            </div>
            <div>
                <h5>Role</h5>
                <span id="rootNameUser">${user.ROLE}</span>
            </div>
            <div>
                <button onclick="handleClickDelUser('${user._id}')">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </li>

            `
        }).join('')
        console.log(rootUsersDetail);
        rootUsersDetail.innerHTML = html
    } catch (error) {
        console.error(error)
    }
}
//RENDER TOWER LISTS
async function renderTowerList(adminID: string) {
    try {
        const rootUsersDetail: HTMLElement = document.getElementById('rootUsersDetail')!
        const dataJs = await fetch('/api/towers/get-towers')
        if (!dataJs) throw new Error('no found dataJs')
        const data = await dataJs.json();
        const { towers } = data
        const html = towers.map(user => {
            return `
            <li class="container__main__container-middle__list">
            <div>
                <h5>Username</h5>
                <span id="rootNameUser"></span>
            </div>
            <div>
                <h5>Email</h5>
                <span id="rootNameUser"></span>
            </div>
            <div>
                <button onclick="handleClickDelTower(${adminID})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </li>

            `
        }).join('')
        console.log(rootUsersDetail);
        rootUsersDetail.innerHTML = html
    } catch (error) {
        console.error(error)
    }
}
//RENDER ENEMY LISTS
async function renderEnemyList(adminID: string) {
    try {
        const rootUsersDetail: HTMLElement = document.getElementById('rootUsersDetail')!
        const dataJs = await fetch('/api/enemy/get-enemy')
        if (!dataJs) throw new Error('no found dataJs')
        const data = await dataJs.json();
        const { enemy } = data

        const html = enemy.map(ene => {
            return `
            <li class="container__main__container-middle__list">
            <div>
                <h5>Enemy Name</h5>
                <span id="rootNameUser">${ene.name}</span>
            </div>
            <div>
                <h5>Type</h5>
                <span id="rootNameUser">${ene.type}</span>
            </div>
            <div>
                <button onclick="handleClickDelUser(${adminID})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </li>

            `
        }).join('')
        console.log(rootUsersDetail);
        rootUsersDetail.innerHTML = html
    } catch (error) {
        console.error(error)
    }
}

// Control

async function handleSubmitCreateTower(ev:any){
try {
    
} catch (error) {
    console.error(error)
}
}
async function handleSubmitCreateEnemy(ev:any){
try {
    
} catch (error) {
    console.error(error)
}
}
async function handleSubmitCreateUser(ev:any){
try {
    
} catch (error) {
    console.error(error)
}


}



async function handleClickDelUser(userID:string){
    try {
if(confirm("Are you sure you want to delete the above user?")){
      const deleteUser = await fetch('/api/users/delete-user' ,{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body:JSON.stringify({
                uid:userID
            })
        }).then((data)=>{
console.log(data);
        })

        location.reload()
    
}
    } catch (error) {
        console.error(error)
    }
}
async function handleClickDelTower(towerID:string){
    try {
        console.log("delete Users");    
    } catch (error) {
        console.error(error)
    }
}

// Click  return back button
function handleClickBack(){
    try {
            window.location.href = "/"
    } catch (error) {
        console.error(error)
    }
}
function handleClickCloseCollapseContainer(){
    try {
        const collapseFormRoot:HTMLElement = document.getElementById('collapseFormRoot')!
        collapseFormRoot.classList.remove('active')
    } catch (error) {
        console.error(error)
    }
}

// bottom Buttons
function handleClickCreateTowerBtn(){
    try {
        const collapseFormRoot:HTMLElement = document.getElementById('collapseFormRoot')!
        collapseFormRoot.classList.add('active')
        collapseFormRoot.innerHTML = renderCreateTowerSection()
    } catch (error) {
        console.error(error)
    }
}
function handleClickCreateEnemyBtn(){
    try {
        const collapseFormRoot:HTMLElement = document.getElementById('collapseFormRoot')!
        collapseFormRoot.classList.add('active')
        collapseFormRoot.innerHTML = renderCreateEnemySection()
    } catch (error) {
        console.error(error)
    }
}
function handleClickCreateUserBtn(){
    try {
        const collapseFormRoot:HTMLElement = document.getElementById('collapseFormRoot')!
        collapseFormRoot.classList.add('active')
        collapseFormRoot.innerHTML = renderCreateUserSection()
    } catch (error) {
        console.error(error)
    }
}

// FILL STATS 

async function  FillRegisteredUsers(){
    try {
        const registeredUserFill: HTMLElement = document.getElementById('registeredUserFill')! // Fill Registered Users Number

          const dataJs = await  fetch('/api/users/get-users');
          if(!dataJs) throw new Error("no found DataJsName");
          const data = await dataJs.json()
          const userNumber = data.users.length.toString()
          registeredUserFill.innerHTML = userNumber
        } catch (error) {
        console.error()
    }
}
async function  FillAdminName(){
    try {
        const nameAdminFill : HTMLElement = document.getElementById('nameAdminFill')! // Fill Name Admin

          const dataJs = await  fetch('/api/users/get-user');
          if(!dataJs) throw new Error("no found DataJsName");
          const data = await dataJs.json()
          const name = data.userId.firstName
          nameAdminFill.innerHTML = name
    } catch (error) {
        console.error()
    }
}

