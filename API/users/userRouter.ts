import {Router} from "express";
import {  createUser, getUsers, login, UpdateUserDetails, getUser, deleteUser, adminCreateUser } from "./userControl";
import { adminAccess } from "./userMiddlwares";

const userRouter = Router()

userRouter
.get("/get-users" , getUsers)
.post("/create-user" , createUser)
.post("/admin-create-user" , adminCreateUser)
.post("/login" , login)
.put("/update-user", UpdateUserDetails)
.get("/get-user" , getUser)
.delete("/delete-user" , deleteUser)

export default userRouter