// Set Background Music 
const backgroundSound = new Audio()
backgroundSound.src = '../audio/backgroundMusicRegisterLogin.mp3'



function onLoad() {
    try {
    } catch (error) {
        console.error(error)
    }
}

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

function handleSubmitLoginForm(ev: any) {
    try {
        ev.preventDefault()
        const { userName, password } = ev.target.elements

        console.log(
            userName.value,
            password.value,

        );


    } catch (error) {
        console.error(error)
    }
}