import {Router} from "express";
import { createEnemy, getEnemies } from "./enemyControl";


const enemyRouter = Router()

enemyRouter
.get("/get-enemies" ,getEnemies )
.post("/create-enemy",createEnemy)

export default enemyRouter