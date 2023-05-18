import {Router} from "express";
import { createGame, getGameCoins, getGames, increaseHighscore } from "./gameControl";


const gameRouter = Router()

gameRouter
.get("/get-games" ,getGames )
.get("/create-game" , createGame)
.get("/get-game-coins" , getGameCoins)
.post("/increase-highscore" , increaseHighscore )


export default gameRouter