const bcrypt = require("bcrypt");
const fs = require("fs").promises;

const User = require("../users/users.model");
const { createVerificationToken } = require("../../services/token.service");
const { createAvatar } = require("../../helpers/avatarCreator");
const { minifyImage } = require("../../helpers/imageMinificator");

const registerController = async (req, res, next) => {
  try {
    const { body } = req;
    const hashedPassword = await bcrypt.hash(
      body.password,
      Number(process.env.SALT)
    );
    const newUser = await User.createUser({
      ...body,
      password: hashedPassword,
    });
    await createAvatar(newUser._id);

    await minifyImage();

    await fs.unlink(`tmp/${newUser._id}.png`);

    await User.updateUser(newUser._id, {
      avatarURL: `http://localhost:3000/images/${newUser._id}.png`,
    });

    res.status(201).json({
      user: {
        email: body.email,
        subscription: newUser.subscription,
      },
    });
  } catch (err) {
    res.status(409).json({
      message: "Email in use",
    });
    next(err);
  }
};

const loginController = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;

    const user = await User.findUser({ email });
    if (!user) {
      return res.status(401).send("Email or password is wrong");
    }

    const isPasswordsEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordsEqual)
      return res.status(401).send("Email or password is wrong");

    const access_token = await createVerificationToken({ id: user._id });

    await User.updateUser(user._id, {
      token: access_token,
    });

    res.json({
      access_token,
      user: {
        email,
        subscription: user.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

const logoutController = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const user = await User.getUserById(userId);
    if (!user) {
      res.status(401).json({
        message: "Not authorized",
      });
      return;
    }

    await User.updateUser(user._id, {
      token: "",
    });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { registerController, loginController, logoutController };
