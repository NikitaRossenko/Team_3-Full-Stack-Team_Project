import {Router} from "express";
import { UpdateUserDetailById, createUser, getUsers, login, UpdateUserDetails, getUser } from "./userControl";

const userRouter = Router()

userRouter
.get("/get-users" , getUsers)
.post("/create-user" , createUser)
.post("/login" , login)
.put("/update-user", UpdateUserDetails)
.get("/get-user" , getUser)
// .put()
.delete("delete-user" ,UpdateUserDetailById )

export default userRouter