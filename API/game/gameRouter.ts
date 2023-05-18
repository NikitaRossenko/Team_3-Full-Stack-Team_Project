import {Router} from "express";
import { createGame, getGames, increaseHighscore } from "./gameControl";


const gameRouter = Router()

gameRouter
.get("/get-games" ,getGames )
.get("/create-game" , createGame)
.post("/increase-highscore" , increaseHighscore )


export default gameRouter