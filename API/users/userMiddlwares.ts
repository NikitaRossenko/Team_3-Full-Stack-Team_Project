import UserModel, { ROLE } from "./userModel";

export async function adminAccess(req: any, res: any, next: any) {
  try {
    console.log("user is admin?");
    const { ifAdmin } = req.cookies;

    const userDB:any = await UserModel.findById(ifAdmin);
    console.log(userDB);

    const {role} = userDB;

    // if(role !== ROLE.ADMIN) {
    //     throw new Error("User is not allowed")
    // }

    next();
  } catch (error: any) {
    console.error(error);
    res.status(401).send({ error: error.message });
  }
}
