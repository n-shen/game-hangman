import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const validAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required." });
  }

  try {
    const { userName } = jwt.verify(
      authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    req.user = await User.findOne({ userName }).select("user_name");
    next();
  } catch (e) {
    return res.status(401).json({ error: "Unauthorized request!" });
  }
};

export default validAuth;
