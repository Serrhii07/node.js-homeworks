const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");

const { createImageminPath, createImageDestinationPath } = require("../config");

const minifyImage = async () => {
  const files = await imagemin(createImageminPath(), {
    destination: createImageDestinationPath(),
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  });

  console.log(files);
};

module.exports = {
  minifyImage,
};
