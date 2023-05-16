import GameModel from "./gameModel";


export const getGames = async (req: any, res: any) => {
    try {
      const gamesDB = await GameModel.find({}).populate(["enemies","towers"]).populate({path:"player",select:"-password"});
      res.send({ ok: true, gamesDB });
    } catch (error) {
      res.status(500).send({ ok: false });
      console.error(error);
    }
  };



  //creat game -> playerId = userid  
  //creat game -> enemiesId[].map  
  //creat game -> towersId[].map