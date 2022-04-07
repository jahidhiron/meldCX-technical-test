const multer = require("multer");
var fs = require("fs");

// create storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    var dir = "public/" + process.env.FOLDER + "/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

// upload multiple file that storage
module.exports = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // checking file type
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/gif" ||
      file.mimetype == "text/html" ||
      file.mimetype == "text/csv" ||
      file.mimetype == "application/json" ||
      file.mimetype == "application/pdf" ||
      file.mimetype == "application/docx" ||
      file.mimetype == "audio/mpeg" ||
      file.mimetype == "video/mp4" ||
      file.mimetype == "video/mpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new Error(
          "Only .png, .jpg, .jpeg, .gif, .html, .json, .csv, .pdf, .docx, .mp4, .mp3 format allowed!"
        )
      );
    }
  },
});
