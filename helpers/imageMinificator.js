const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");

const minifyImage = async () => {
  const files = await imagemin(["tmp/*.{jpg,png}"], {
    destination: "public/images",
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