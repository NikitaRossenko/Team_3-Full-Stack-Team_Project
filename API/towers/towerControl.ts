import TowerModel from "./towerModel";


export const getTowers = async (req: any, res: any) => {
  try {
    const towerDB = await TowerModel.find({});
    res.send({ ok: true, towerDB });
  } catch (error) {
    res.status(500).send({ ok: false });
    console.error(error);
  }
};

export const createTower = async (req: any, res: any) => {
  try {
    const { name, image, damage, radius, cost, level } = req.body;

    const existTower = await TowerModel.findOne({
      name,
      image,
    });

    if (existTower) throw new Error("User already exist");

    const towerDB = await TowerModel.create({
        name,
        image,
        damage,
        radius,
        cost,
        level,
    });

    res.status(201).send({ ok: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};
