import { Request, Response } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: (Error | null), destination: string) => void) => {
    cb(null, "./src/uploads/images");
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: (Error | null), filename: string) => void) => {
    const filename = file.originalname.replace(/ /g, "_");
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

export const uploadImage = upload.single('file');

export const handleImageUpload = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send({
    message: 'File uploaded successfully!',
    file: req.file,
    filename: req.file.filename
  });
};
