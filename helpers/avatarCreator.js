const AvatarGenerator = require("avatar-generator");
const { createPartsPath, createTmpPath } = require("../config");

const createAvatar = async (userId) => {
  const avatar = new AvatarGenerator({
    parts: ["background", "face", "clothes", "head", "hair", "eye", "mouth"],
    partsLocation: createPartsPath(),
    imageExtension: ".png",
  });
  const variant = "male";
  const image = await avatar.generate(userId, variant);
  image.png().toFile(createTmpPath(userId));
};

module.exports = {
  createAvatar,
};
