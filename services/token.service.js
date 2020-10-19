const jwt = require("jsonwebtoken");

const createVerificationToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.ACCESS_KEY);
  return `Bearer ${token}`;
};

const verifyToken = async (token) => {
  const parsedToken = token.replace("Bearer ", "");
  return await jwt.verify(parsedToken, process.env.ACCESS_KEY);
};

const createEmailToken = (email) => {
  return jwt.sign({ email }, process.env.EMAIL_TOKEN_KEY);
};

const verifyEmailToken = (token) => {
  return jwt.verify(token, process.env.EMAIL_TOKEN_KEY);
};

module.exports = {
  createVerificationToken,
  verifyToken,
  createEmailToken,
  verifyEmailToken,
};
