import mongoose, {Schema} from 'mongoose'

export interface Tower {
    name: string;
    image: string;
    damage: number;
    radius: number;
    cost: number;
    level: number;
  }
  
  // Define interface for Tower document with Mongoose document methods
  
  // Define Mongoose schema for Tower document
  export const TowerSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    damage: { type: Number, required: true },
    radius: { type: Number, required: true },
    cost: { type: Number, required: true },
    level: { type: Number, required: true },
  });

  const towerModel = mongoose.model("tower"  , TowerSchema)
  
  export default towerModel