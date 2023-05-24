import {Router} from "express";
import {  createUser, getUsers, login, UpdateUserDetails, getUser, deleteUser, adminCreateUser, logout, changeUserIcon, resetPassword } from "./userControl";
import { adminAccess } from "./userMiddlwares";

const userRouter = Router()

userRouter
.get("/get-users", getUsers)
.post("/create-user" , createUser)
.post("/admin-create-user" ,adminAccess, adminCreateUser)
.post("/login" , login)
.patch('/reset-password', resetPassword)
.put("/update-user", UpdateUserDetails)
.get("/get-user" , getUser)
.delete("/delete-user" , deleteUser)
.get("/delete-cookie" , logout)
.patch('/change-icon' , changeUserIcon)

export default userRouter