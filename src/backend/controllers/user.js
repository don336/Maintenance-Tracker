import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv/config';
import User from "../model/user.js";
import { v4 as uuidv4 } from "uuid";


class controller {
  static registerUser = async (req, res) => {
    const { name, username, email, password } = req.body;

    const _email = await User.findOne({ email });
    if (_email)
      return res.status(409).json({ message: "Email already exists" });

    const _username = await User.findOne({ username });
    if (_username)
      return res.status(409).json({ message: "username already exists" });

    const salt = await bcrypt.genSalt(8);
    const encrypted_password = await bcrypt.hash(password, salt);
    try {
      const user = await User.create({
        id: uuidv4(),
        name,
        username,
        email,
        password: encrypted_password,
      });
      user.save();

      return res.status(201).json({
        message: "User Registered",
        user,
      });
    } catch (err) {
      return res.status(400).json({
        msg: err
      })
    }
  };

  static signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          Error: "Email doesnot Exist",
        });
      }
  
      const passCheck = bcrypt.compare(password, user.password);
      if (!passCheck) {
        return res.status(401).json({ Error: "Check Email or Password" });
      }
  
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  
      res.cookie("token", token, { expire: new Date() + 1 });
      const { _id, username } = user;
      return res.status(201).json({
        token,
        user: {
          _id,
          username,
          email,
        },
      });
    } catch(err){
      return res.status(400).json({
        Error: "Check you Inputs and try again",
      });
    }
  };

  static signOut = (req, res) => {
    res.clearCookie("token");
    return res.json({
      message: "User has signed out!",
    });
  };
}

export default controller;