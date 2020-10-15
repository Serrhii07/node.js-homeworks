const UserDB = require("./users.model");

const { createAvatarURL } = require("../../config");

const getCurrentUserController = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const currentUser = await UserDB.getUserById(userId);
    if (!currentUser) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
    res.json({
      email: currentUser.email,
      subscription: currentUser.subscription,
    });
  } catch (e) {
    next(e);
  }
};

const uploadAvatarController = async (req, res, next) => {
  try {
    const { file } = req;
    const { id: userId } = req.user;
    const avatarURL = createAvatarURL(file.filename.split(".")[0]);
    await UserDB.updateUser(userId, { avatarURL });
    res.send(avatarURL);
  } catch (e) {
    next(e);
  }
};

module.exports = { getCurrentUserController, uploadAvatarController };
