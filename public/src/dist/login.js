// Set Background Music 
var backgroundSound = new Audio();
backgroundSound.src = '../audio/backgroundMusicRegisterLogin.mp3';
function onLoad() {
    try {
    }
    catch (error) {
        console.error(error);
    }
}
// handle functions
function handleClickMusicBtn() {
    try {
        var btnPlay = document.querySelector('#btn-play-pause img');
        if (!btnPlay)
            throw new Error("Button Play element no exists ");
        btnPlay.classList.toggle("active");
        if (btnPlay.classList.contains('active'))
            backgroundSound.pause();
        else
            backgroundSound.play();
    }
    catch (error) {
        console.error(error);
    }
}
function handleLogin(ev) {
    try {
        ev.preventDefault();
        var userName = ev.target.elements.userName.value;
        var password = ev.target.elements.password.value;
        if (!userName)
            throw new Error("No userName");
        if (!password)
            throw new Error("No Password");
        var loginUser = { userName: userName, password: password };
        fetch("/api/users/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginUser)
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            if (data.error) {
                alert(data.error);
                return;
            }
            //   const {password, ...currentUser} = data.userDB
            //   localStorage.setItem("currentUser", JSON.stringify(currentUser)) //cookie
            //save user without password in cookies
            window.location.href = "/";
        })["catch"](function (error) {
            console.error(error);
        });
    }
    catch (error) {
        console.error(error);
    }
}
