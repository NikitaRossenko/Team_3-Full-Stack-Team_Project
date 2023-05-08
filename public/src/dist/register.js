function handleSubmitRegisterForm(ev) {
    try {
        ev.preventDefault();
        var firstName = ev.target.elements.firstName.value;
        var lastName = ev.target.elements.lastName.value;
        var userName = ev.target.elements.userName.value;
        var email = ev.target.elements.email.value;
        var password = ev.target.elements.password.value;
        var cPassword = ev.target.elements.cPassword.value;
        if (!firstName)
            throw new Error("No firstName");
        if (!lastName)
            throw new Error("No lastName");
        if (!userName)
            throw new Error("No userName");
        if (!email)
            throw new Error("No email");
        if (!password)
            throw new Error("No password");
        if (!cPassword)
            throw new Error("No cPassword");
        var newUser = { firstName: firstName, lastName: lastName, email: email, userName: userName, password: password, cPassword: cPassword };
        if (password !== cPassword) {
            alert("the Confirm Password isn't correct");
            return;
        }
        window.location.href = "/login.html";
        fetch("/api/users/create-user", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
        });
    }
    catch (error) {
        console.error(error);
    }
}
