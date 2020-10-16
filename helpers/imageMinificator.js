const imagemin = require("imagemin");
const fs = require("fs").promises;

const { createAvatarURL } = require("../config");
const { createImageminPath, createImageDestinationPath } = require("../config");

const minifyImage = async () => {
  try {
    const files = await imagemin([createImageminPath()], {
      destination: createImageDestinationPath(),
    });

    await fs.unlink(files[0].sourcePath);

    const avatar = files[0].destinationPath.split("\\")[2];
    return createAvatarURL(avatar);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  minifyImage,
};
