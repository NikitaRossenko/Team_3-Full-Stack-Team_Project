import EnemyModel from "../enemy/enemyModel";
import TowerModel from "../towers/towerModel";
import UserModel from "../users/userModel";
import GameModel from "./gameModel";
import jwt from "jwt-simple";


export const getGames = async (req: any, res: any) => {
  try {
    const gamesDB = await GameModel.find({})
      .populate(["enemies", "towers"])
      .populate({ path: "player", select: "-password" });
    res.send({ ok: true, gamesDB });
  } catch (error) {
    res.status(500).send({ ok: false });
    console.error(error);
  }
};

export const increaseHighscore = async (req:any, res:any) => {
  try {
    const {currentUser} = req.cookies;
    const {score} = req.body;
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error("Server Error")

    const {userId} = jwt.decode(currentUser, secret)
    const user = await UserModel.findOne({_id:userId})
    if (!user) throw new Error("Server Error")
    if (user.highScore < score){
      const updatedHighscore = await UserModel.findOneAndUpdate({_id:userId}, {highScore:score})
    }

  } catch (error) {
    res.status(500).send({ ok: false });
    console.error(error);
  }
}

//creat game -> playerId = userid
//creat game -> enemiesId[].map
//creat game -> towersId[].map

export const createGame = async (req: any, res: any) => {
  try {

    const {currentUser} = req.cookies;
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error("Server Error")

    const {userId} = await jwt.decode(currentUser, secret)
console.log("hiiiiiiii");
    const enemy = EnemyModel.find({})
    const tower = TowerModel.find({})
    

    const gameDB = await GameModel.create({
    player:userId,
    enemy,
    tower,
    score:100,
    level:1,
    });

    res.status(201).send({ ok: true});
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
