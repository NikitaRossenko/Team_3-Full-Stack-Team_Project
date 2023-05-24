
const onLoad = () =>{
console.log("The Page Load");
}

async function handleResetPassword(ev: any) {
    try {
        ev.preventDefault();
        const { userName, email, lastName } = ev.target.elements


        fetch("/api/users/reset-password", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: userName.value,
                email: email.value,
                lastName: lastName.value
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    const container__form = document.querySelector(".container__form")
                    const userNotification = document.querySelector(".userNotification")
                    if (!container__form) throw new Error("DOM Error")

                    if (!userNotification) {
                        container__form.insertAdjacentHTML('afterend', '<p class="userNotification">one or more detail not correct <p>')
                    }

                    throw new Error(data.error)
                } else {
                    const containerPassword: HTMLElement | null = document.querySelector('.container-password');
                    if (!containerPassword) throw new Error("no found container password element");
                    containerPassword.innerHTML = renderPassword(data.newPassword)
                  
                }
            })
    }
    catch (error: any) {
        console.error(error)
    }
}



function renderPassword(password: string): string {
    try {

        const containerPassword: HTMLElement | null = document.querySelector('.container-password');
        if (!containerPassword) throw new Error("no found container password element");
      containerPassword.style.display = "block"
        const html = `
        <div>
        <h3>You new password : </h3>
        <h1 id="rePass">${password}</h1>
        <p>write the password until you change it in your profile </p>
       </div>
       
    `
        return html
    } catch (error) {
        console.error(error)
        return ''
    }
}