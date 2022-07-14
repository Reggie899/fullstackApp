import bycrypt from "bcryptjs";

import User from "../models/User.js";
import { generateToken } from "../helpers/generateToken.js";


//___________________________Register:_________________________________

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 * @description registration request controller
 */

export const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
    //   .status(400)
      .json({ message: "Email already exists" });
    if (password !== confirmPassword)
      return res
    //   .status(400)
      .json({ message: "Passwords don't match" });
    const hashPassword = await bycrypt.hash(password, 12);
    const Id = (await User.find()).length + 1; //
    const savedUser = await User.create({
      email,
      password: hashPassword,
      username,
      id: Id,
    });
    const token = generateToken({
      username,
      id: Id,
    });
    res
    // .status(200)
    .json({token: token, user: savedUser});
        // savedUser, token);
  } catch (err) {
    res.json({ message: "Something went wrong:", error: err.message });
  }
};

//______________________________Login:______________________________
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {void}
 * @description signin request controller
 */

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser)
          return res.status(404).json({ message: "Wrong sign in data" });
        const isPasswordCorrect = await bycrypt.compare(
          password,
          existingUser.password
        );
        if (!isPasswordCorrect)
          return res.status(404).json({ message: "Wrong sign in data" });
        const token = generateToken({
          username: existingUser.username,
          id: existingUser.id,
        });
        res.status(200).json({
          token,
          user: {
            username: existingUser.username,
            id: existingUser.id,
          },
        });
      } catch (err) {
        res.status(500).json({
          message: "something went wrong:",
          error: err.message,
        });
      }
}


//______________________________Test:______________________________


export const list =  async (req, res) => {
    const users = await User.find();
    res.json(users);
}
