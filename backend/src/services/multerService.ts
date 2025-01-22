import axios from "axios";
import { Request, Response, NextFunction } from "express";
import FormData from "form-data";
import multer from "multer";

const MAX_FILE_SIZE = 1024 * 1024 * 2;

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only PNG files are allowed!"), false);
    }
  },
});

const imgBbUpload = async (fileBuffer: Buffer): Promise<string> => {
  const form = new FormData();
  form.append("image", fileBuffer.toString("base64"));

  try {
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.IMGBB_API}`,
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
      },
    );
    return res.data.data.url;
  } catch (error) {
    throw new Error("Failed to upload image to ImgBB");
  }
};

export const fileMiddleware = [
  upload.single("escudo"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;

      if (!file) {
        next();
        res.status(400).json({ error: "No file provided" });
        return;
      }

      const fileBuffer = file.buffer;

      const imageUrl = await imgBbUpload(fileBuffer);

      req.body.imageurl = imageUrl;
      next();
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  },
];
