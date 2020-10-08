const { verifyToken } = require("../services/token.service");
const User = require("../api/users/users.model");

const checkAuthTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) return res.status(401).send("No token provided");
    const data = await verifyToken(token);
    const user = await User.getUserById(data.id);
    if (!user) {
      res.status(401).json({
        message: "Not authorized",
      });
      return;
    }
    req.user = {
      id: user._id,
      email: user.email,
      subscription: user.subscription,
    };
    next();
  } catch (e) {
    res.status(401).json({
      message: "Not authorized",
    });
  }
};

module.exports = {
  checkAuthTokenMiddleware,
};
