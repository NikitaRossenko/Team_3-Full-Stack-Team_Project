import UserModel from "./userModel";
import jwt from "jwt-simple";



export const getUsers = async (req: any, res: any) => {
  try {
    const users = await UserModel.find({});
    res.send({ ok: true, users });
  } catch (error) {
    res.status(500).send({ ok: false });
    console.error(error);
  }
};
export const createUser = async (req: any, res: any) => {
  try {

    const { firstName, lastName, userName, email, password } = req.body;


    const existUsername = await UserModel.findOne({userName:userName});
    const existUserEmail = await UserModel.findOne({email:email});

    if (existUsername || existUserEmail) throw new Error("User already exist")

    const userDB = await UserModel.create({
      firstName,
      lastName,
      userName,
      email,
      password,
    });

    res.status(201).send({ ok: true, userDB });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const UpdateUserDetailById = async (req: any, res: any) => {
  try {
    const uid = req.body ;
    console.log(uid);
    if(!uid) throw new Error("no uID user")
    const updateUser = UserModel.findByIdAndUpdate(uid , {})
    console.log(updateUser);
    res.status(201).send({ok:true , user:updateUser})
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (req: any, res: any) => {
  try {
    const {uid}  = req.body;
    if (!uid) throw new Error("uID no founded");
    console.log(uid);
    const deleteUser = await UserModel.findByIdAndDelete(uid);
    console.log(deleteUser);
    if (!deleteUser) throw new Error("user no founded");
    res.status(201).send({ ok: true  , user:deleteUser});
  } catch (error) {
    res.status(500).send({ ok: false });

    console.error(error);
  }
};
export const addUser = async (req: any, res: any) => {
  try {
  } catch (error) {
    console.error(error);
  }
};

export const login = async (req: any, res: any) => {
  try {
    const secret = process.env.JWT_SECRET;
    const { userName, password } = req.body;

    const userDB = await UserModel.findOne({ userName, password });

    if (!userDB) {
      res.status(401).send({ error: "email or password are inncorect" });
      return;
    }
    if (!secret) throw new Error("Server Error");
    const token = jwt.encode({ userId: userDB._id}, secret);
    res.cookie("currentUser", token, { httpOnly: true });
    res.status(201).send({ ok: true, userDB });

  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const UpdateUserDetails = async (req: any, res: any) => {
  try {
    const { _id, firstName, lastName, email, userName, password } = req.body;

    const userDB = await UserModel.findByIdAndUpdate(_id, {

      firstName,
      lastName,
      email,
      userName,
      password,
    });
    if (!userDB) throw new Error("No userDB in array");
    res.send({ ok: true });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export const getUser = async (req: any, res: any) => {
  try {
    const secret = process.env.JWT_SECRET || "sddslahkjaskjnbalkjs";
    const { currentUser } = req.cookies;
    if (!secret) throw new Error("No secret");
    const decoded = jwt.decode(currentUser, secret);
    
    const { userId } = decoded;

    const userDB = await UserModel.findById(userId);

    res.send({ ok: true, userId: userDB });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

