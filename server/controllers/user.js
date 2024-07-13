import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Password dont match" });
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res
      .status(400)
      .json({ message: "User already exists (user-controller)" });
  const hashedPass = await bcrypt.hash(password, 12);
  const result = await User.create({
    email: email,
    password: hashedPass,
    name: `${firstName}${lastName}`,
  });

  const token = jwt.sign({ email: result.email, id: result._id }, "test", {
    expiresIn: "1h",
  });

  res.status(200).json({ result, token });
  try {
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
