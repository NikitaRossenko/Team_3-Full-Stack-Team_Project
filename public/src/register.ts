async function handleSubmitRegisterForm(ev: any) {
    try {
        ev.preventDefault()
        const { fName, lName, email, userName, password, cPassword } = ev.target.elements

        // if(password !== cPassword) throw new Error("the password no correct")
        const dataJs = await fetch('/api/users/create-user' ,{
                method:"POST" ,
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                body:JSON.stringify({
                    fName:fName.value,
                    lName:lName.value,
                    email:email.value,
                    userName:userName.value,
                    password:password.value,
                })

            }).then((data)=>console.log(data))
            .catch(err=>console.error(err))
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