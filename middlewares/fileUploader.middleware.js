const multer = require("multer");

const imageUploader = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images");
    },
    filename: function (req, file, cb) {
      const { id } = req.user;
      const fileType = file.mimetype.split("/")[1];
      if (fileType !== "jpeg" && fileType !== "jpg" && fileType !== "png") {
        return cb(new Error("File type is not valid"));
      }
      cb(null, `${id}.${fileType}`);
    },
  });

  return multer({ storage }).single("avatar");
};

module.exports = {
  imageUploaderMiddleware: imageUploader(),
};
