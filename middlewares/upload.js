import multer from "multer";

import path from "path";

const tempPath = path.join(__dirname, "../", "temp");
const avatarSize = 1048576;

const multerConfig = multer.diskStorage({
  destination: tempPath,
  filename: (req, res, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: avatarSize,
  },
});

const upload = multer({
  storage: multerConfig,
});

export default upload;
