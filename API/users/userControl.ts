import UserModel from "./userModel"


export const getUsers = async (req: any, res: any) => {
    try {
        const users = await UserModel.find({});
        if (!users) throw new Error("No users were found in the DB")
        res.send({ ok: true, users })
    } catch (error) {
        res.status(500).send({ok:false })
        console.error(error)
    }
}
export const createUser = async (req: any, res: any) => {
    try {
        const { fName, lName, email, userName, password, src } = req.body
        if(!fName) throw new Error("fName no founded")
        if(!lName) throw new Error("lName no founded")
        if(!userName) throw new Error("userName no founded")
        if(!email) throw new Error("email no founded")
        if(!password) throw new Error("password no founded")
        if(!src) console.warn("src no founded")

        const createUser = await UserModel.create({
            firstName: fName,
            lastName: lName,
            userName,
            email,
            password,
            src
        })
    res.status(201).send({ok:true , user:createUser})

    } catch (error) {
        res.status(500).send({ok:false })
        console.error(error)
    }
}

export const UpdateUserDetailById = async (req: any, res: any) => {
    try {
        
    } catch (error) {
        console.error(error)
    }
}

export const deleteUser = async (req: any, res: any) => {
        try {
            const uID = req.body
            if(!uID) throw new Error("uID no founded")
            const deleteUser = UserModel.findByIdAndDelete(uID)
            if(!deleteUser) throw new Error("user no founded")
            res.status(201).send({ok:true })
    } catch (error) {
            res.status(500).send({ok:false })

        console.error(error)
    }
}
export const addUser = async (req: any, res: any) => {
    try {

    } catch (error) {
        console.error(error)
    }
}