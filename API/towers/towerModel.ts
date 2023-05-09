import mongoose, {Schema} from 'mongoose'

export interface Tower {
    name: string;
    type: string;
    damage: number;
    range: number;
    fireRate: number;
    cost: number;
    level: number;
  }
  
  // Define interface for Tower document with Mongoose document methods
  
  // Define Mongoose schema for Tower document
  export const TowerSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    damage: { type: Number, required: true },
    range: { type: Number, required: true },
    fireRate: { type: Number, required: true },
    cost: { type: Number, required: true },
    level: { type: Number, required: true },
  });

  const towerModel = mongoose.model("tower"  , TowerSchema)
  
  export default towerModel