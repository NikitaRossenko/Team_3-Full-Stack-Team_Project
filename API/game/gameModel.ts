import mongoose, { Schema } from "mongoose";
import { TowerSchema } from "../towers/towerModel";
import { EnemySchema } from "../enemy/enemyModel";
import { UserSchema } from "../users/userModel";

export interface Game {
    player: string;
    score: number;
    level: number;
}


const GameSchema = new Schema({
    player: UserSchema,
    score: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    towers: [TowerSchema],
    enemies: [EnemySchema],
})

const GameModel = mongoose.model("game" , GameSchema)

export default GameModel