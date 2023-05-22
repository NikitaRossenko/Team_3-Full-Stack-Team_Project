import {Router} from "express";
import {  createUser, getUsers, login, UpdateUserDetails, getUser, deleteUser, adminCreateUser, logout, changeUserIcon, getUserResolution, setUserResolution } from "./userControl";
import { adminAccess } from "./userMiddlwares";

const userRouter = Router()

userRouter
.get("/get-users", getUsers)
.post("/create-user" , createUser)
.post("/admin-create-user" ,adminAccess, adminCreateUser)
.post("/login" , login)
.put("/update-user", UpdateUserDetails)
.get("/get-user" , getUser)
.get("/get-user-resolution" , getUserResolution)
.post("/set-user-resolution" , setUserResolution)
.delete("/delete-user" , deleteUser)
.get("/delete-cookie" , logout)
.patch('/change-icon' , changeUserIcon)

export default userRouter