import {Router} from "express";
import {  createUser, getUsers, login, UpdateUserDetails, getUser, deleteUser } from "./userControl";
import { adminAccess } from "./userMiddlwares";

const userRouter = Router()

userRouter
.get("/get-users" , getUsers)
.post("/create-user" , createUser)
.post("/login" , login)
.put("/update-user", UpdateUserDetails)
.get("/get-user" , getUser)
.delete("/delete-user" , deleteUser)

export default userRouter