import EnemyModel from "./enemyModel";

export const getEnemies = async (req: any, res: any) => {
  try {
    const enemyDB = await EnemyModel.find({});
    res.send({ ok: true, enemyDB });
  } catch (error) {
    res.status(500).send({ ok: false });
    console.error(error);
  }
};

export const createEnemy = async (req: any, res: any) => {
  try {
    const { name, image, health } = req.body;

    const existEnemy = await EnemyModel.findOne({
      name,
      image,
    });

    if (existEnemy) throw new Error("User already exist");

    const enemyDB = await EnemyModel.create({
        name,
        image,
        health,
    });

    res.status(201).send({ ok: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
