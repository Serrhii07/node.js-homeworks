const AvatarGenerator = require("avatar-generator");

const createAvatar = async (userId) => {
  const avatar = new AvatarGenerator({
    parts: ["background", "face", "clothes", "head", "hair", "eye", "mouth"],
    partsLocation: "node_modules/avatar-generator/img",
    imageExtension: ".png",
  });
  const variant = "male";
  const image = await avatar.generate(userId, variant);
  image.png().toFile(`./tmp/${userId}.png`);
};

module.exports = {
  createAvatar,
};
