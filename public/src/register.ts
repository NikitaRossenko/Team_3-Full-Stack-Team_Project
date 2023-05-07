function handleSubmitRegisterForm(ev: any) {
    try {
        ev.preventDefault()
        const { fName, lName, email, userName, password, cPassword } = ev.target.elements
        
        console.log(
            fName.value,
            lName.value,
            email.value,
            userName.value,
            password.value,
            cPassword.value
            );


    } catch (error) {
        console.error(error)
    }
}