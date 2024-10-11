import multer from "multer";

const storage = multer.memoryStorage();

const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
const maxSize = 512 * 1024;

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Invalid file type. Only JPEG and PNG are allowed."));
  }
  cb(null, true);
};

// Set up multer
export const imageUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize },
}).array("images", 5);
