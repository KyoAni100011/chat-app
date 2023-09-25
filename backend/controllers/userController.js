import { User } from "../models/userModel.js";
import "dotenv/config";

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "The user doesn't exist" });
    }

    if (user.password !== password) {
      return res.status(400).json({ msg: "The password is wrong" });
    }

    const selectedFiled = {
      username: user.username,
      id: user._id,
      email: user.email,
      avatar: user.avatar,
    };

    return res.status(200).json({
      user: selectedFiled,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ msg: "An error occurred", error: err.message });
  }
};

const Register = async (req, res) => {
  try {
    const { email, username } = req.body;

    const user = await User.findOne({ email: email, username: username });

    if (user) {
      return res.status(400).json({ msg: "The user already exists" });
    }

    const newUser = new User(req.body);
    await newUser.save();

    const selectedFiled = {
      username: newUser.username,
      id: newUser._id,
      email: newUser.email,
    };

    return res.status(200).json({
      user: selectedFiled,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "An error occurred",
      error: err.message,
    });
  }
};

const setAvatar = async (req, res) => {
  try {
    const { linkImage, id } = req.body;
    const updateUser = await User.findByIdAndUpdate(id, {
      avatar: linkImage,
    });

    const selectedFiled = {
      username: updateUser.username,
      id: updateUser._id,
      email: updateUser.email,
      avatar: linkImage,
    };

    return res.status(200).json({
      user: selectedFiled,
      msg: "Upadeting successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ msg: "Error updating avatar" });
  }
};

export { Login, Register, setAvatar };
