import {Router} from "express";
import { UpdateUserDetailById, createUser, getUsers } from "./userControl";

const userRouter = Router()

userRouter
.get("get-users" , getUsers)
.post("create-user" , createUser)
// .patch()
// .put()
.delete("delete-user" ,UpdateUserDetailById )

export default userRouter