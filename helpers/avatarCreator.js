const AvatarGenerator = require("avatar-generator");
const { createPartsPath, createTmpPath } = require("../config");
const { minifyImage } = require("./imageMinificator");

const createAvatar = async (userId) => {
  try {
    const avatar = new AvatarGenerator({
      parts: ["background", "face", "clothes", "head", "hair", "eye", "mouth"],
      partsLocation: createPartsPath(),
      imageExtension: ".png",
    });
    const variant = "male";
    const image = await avatar.generate(userId, variant);
    image.png().toFile(createTmpPath(userId));
    return await minifyImage();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createAvatar,
};
