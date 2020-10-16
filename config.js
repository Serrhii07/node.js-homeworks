const createAvatarURL = (fileName) =>
  `http://localhost:3000/images/${fileName}`;
const createTmpPath = (id) => `tmp/${id}.png`;
const createPartsPath = () => "node_modules/avatar-generator/img";
const createImageminPath = () => "tmp/*.{jpg,png}";
const createImageDestinationPath = () => "public/images";

module.exports = {
  createAvatarURL,
  createTmpPath,
  createPartsPath,
  createImageminPath,
  createImageDestinationPath,
};
