import {Router} from "express";
import { createGame, getGameCoins, getGameWaveCount, getGames, increaseHighscore } from "./gameControl";


const gameRouter = Router()

gameRouter
.get("/get-games" ,getGames )
.get("/create-game" , createGame)
.get("/get-game-coins" , getGameCoins)
.get("/get-game-wave-count" , getGameWaveCount)
.post("/increase-highscore" , increaseHighscore )


export default gameRouter