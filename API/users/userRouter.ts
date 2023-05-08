import {Router} from "express";
import { UpdateUserDetailById, createUser, getUsers, login, UpdateUserDetails } from "./userControl";

const userRouter = Router()

userRouter
.get("/get-users" , getUsers)
.post("/create-user" , createUser)
.post("/login" , login)
.patch("/update-user", UpdateUserDetails)
// .put()
.delete("delete-user" ,UpdateUserDetailById )

export default userRouter