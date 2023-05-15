import {Router} from "express";
import { createTower, getTowers } from "./towerControl";


const towerRouter = Router()

towerRouter
.get("/get-towers" ,getTowers )
.post("/create-tower",createTower)

export default towerRouter