const UserDB = require("./users.model");

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

module.exports = { getCurrentUserController };
