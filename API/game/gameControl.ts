import EnemyModel from "../enemy/enemyModel";
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

//creat game -> playerId = userid
//creat game -> enemiesId[].map
//creat game -> towersId[].map

// export const createGame = async (req: any, res: any) => {
//   try {

//     const { playerId, enemyId, towersId, game, score, level } = req.body;
    

//     const gameDB = await GameModel.create({
//     userId:playerId,
//     enemyId,
//     towersId,
//     game,
//     score,
//     level,
//     });

//     res.status(201).send({ ok: true, gameDB });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).send({ error: error.message });
//   }
// };
