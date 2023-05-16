import {Router} from "express";
import { getGames } from "./gameControl";


const gameRouter = Router()

gameRouter
.get("/get-games" ,getGames )


export default gameRouter