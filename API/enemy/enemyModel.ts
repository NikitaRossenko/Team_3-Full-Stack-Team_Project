import mongoose, {Schema} from "mongoose";

export interface Enemy {
  name: string;
  type: string;
  health: number;
  damage: number;
  speed: number;
  level: number;
  location: string[];
}


export const EnemySchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  health: { type: Number, required: true },
  damage: { type: Number, required: true },
  speed: { type: Number, required: true },
  level: { type: Number, required: true },
  location: { type: String, required: true },
});

const enemyModel = mongoose.model("enemies" , EnemySchema)

export default enemyModel