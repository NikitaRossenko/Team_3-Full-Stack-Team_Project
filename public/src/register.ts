

function handleSubmitRegisterForm(ev: any) {
    try {
        ev.preventDefault()
        const firstName = ev.target.elements.firstName.value;
        const lastName = ev.target.elements.lastName.value;
        const userName = ev.target.elements.userName.value;
        const email = ev.target.elements.email.value;
        const password = ev.target.elements.password.value;
        const cPassword = ev.target.elements.cPassword.value;
        if (!firstName) throw new Error("No firstName");
        if (!lastName) throw new Error("No lastName");
        if (!userName) throw new Error("No userName");
        if (!email) throw new Error("No email");
        if (!password) throw new Error("No password");
        if (!cPassword) throw new Error("No cPassword");
        const newUser = { firstName, lastName, email, userName, password, cPassword};
        if(password !== cPassword){
            alert("the Confirm Password isn't correct")
            return
        }
        fetch("/api/users/create-user", {
            method: "POST",
            headers: {
                Accept: "application/json",
              "Content-Type": "application/json",
            },
                  body: JSON.stringify(newUser)
                })        
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        const container__form = document.querySelector(".container__form")
                        const userNotification = document.querySelector(".userNotification")
                        if (!container__form) throw new Error("DOM Error")

                        if (!userNotification){
                            container__form.insertAdjacentHTML('afterend', '<p class="userNotification">Username or Email already exist<p>')
                        }

                        throw new Error(data.error)
                    }

                    window.location.href = "/login.html";

                })

    } catch (error) {
        console.error(error)
    }
}