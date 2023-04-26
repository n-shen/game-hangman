import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const generateToken = (_user_name) => {
  return jwt.sign({ _user_name }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export async function login(req, res) {
  const { userName, userPassword } = req.body;

  try {
    const userProfile = await User.signIn(userName, userPassword);

    const token = generateToken(userProfile.user_name);

    res.json({
      success: true,
      message: "User logged in!",
      user: userName,
      token: token,
    });
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
}

export async function signup(req, res) {
  const { userName, userPassword, userBackupCode } = req.body;

  try {
    const userProfile = await User.signUp(
      userName,
      userPassword,
      userBackupCode
    );

    const token = generateToken(userProfile.user_name);

    res.json({
      success: true,
      message: "New user created!",
      user: userName,
      token: token,
    });
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
}
