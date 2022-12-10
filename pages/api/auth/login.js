import jwt from "jsonwebtoken";
// const bcrypt = require('bcryptjs');
import connectMongo from "../../../database/conn";
import bcrypt, { compare } from "bcryptjs";
import getConfig from "next/config";
import Users from "../../../model/UserSchema";
import {serialize} from "cookie";

const { serverRuntimeConfig } = getConfig();

export default async function handler(req, res) {
  connectMongo().catch((error) =>
    res.json({ message: "Connection Failed...!" })
  );
  const { email, password } = req.body;
//   console.log("emailget", email);
  const user = await Users.findOne({ email: email });

  const checkPassword = await compare(password, user.password);
//   console.log("checkPassword", checkPassword, user._id);
  // validate
  if (!checkPassword) {
    throw "Username or password is incorrect";
  }
  // create a jwt token that is valid for 7 days

  const token = jwt.sign({ sub: user._id }, "OJuZVgT6cGSz9tq7Xz0BtQactb9n7AuVnA4Nvsan3KQ=", {
    expiresIn: "7d",
  });

  const sendData = (user._id)
// console.log(sendData);
  const serialised =serialize("OursiteJWT", sendData,{
    httpOnly: true, 
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
  });
  res.setHeader("Set-Cookie", serialised);
//   console.log("token jwd",token);

//   console.log("oklogin", token);
  // return basic user details and token
//   console.log(user._id)
  return res.status(200).json({ success: "Success"})
//   return res.status(200).json({
//     id: user._id,
//     // username: user.username,
//     // firstName: user.firstName,
//     token,
//   });
}
