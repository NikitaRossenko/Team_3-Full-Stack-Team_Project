import express from "express";
const cookieParser = require('cookie-parser')


const app = express();
app.use(cookieParser())
import mongoose, { Schema } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();


app.use(express.json());
const uri: string | undefined = process.env.MONGO_DB;

if (uri) {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("DB connected!");
    })
    .catch((err) => console.log(err));
} else {
  console.log("No URI to DB");
}




app.use(express.static(`./public`));
app.use(express.static(`./public/pages`));

app.listen(3000, () => {
  console.log("server listen on port 3000");
});