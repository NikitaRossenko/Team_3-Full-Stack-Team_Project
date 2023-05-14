// Set Background Music 
const backgroundSound = new Audio()
backgroundSound.src = '../audio/backgroundMusicRegisterLogin.mp3'



// function onLoad() {
//     try {
//     } catch (error) {
//         console.error(error)
//     }
// }

// handle functions

function handleClickMusicBtn() {
    try {

        const btnPlay: HTMLElement | null = document.querySelector('#btn-play-pause img');
        if (!btnPlay) throw new Error("Button Play element no exists ");
        btnPlay.classList.toggle("active")
        if (btnPlay.classList.contains('active'))
            backgroundSound.pause()
        else
            backgroundSound.play()

    } catch (error) {
        console.error(error)
    }
}

 function handleLogin(ev: any) {
    try {
        ev.preventDefault();
        const userName = ev.target.elements.userName.value;
      const password = ev.target.elements.password.value;
      if (!userName) throw new Error("No userName");
      if (!password) throw new Error("No Password");
      const loginUser: any = { userName, password };

      fetch("/api/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      })
      .then((res) => res.json())
      .then((data) => {
          if(data.error) {
              alert(data.error)
              return
            }
            window.location.href = "/";
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }

