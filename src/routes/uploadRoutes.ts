import { Router } from "express";
import { uploadImage, handleImageUpload } from "../controllers/uploadController";

const router = Router();

router.post("/image", uploadImage, handleImageUpload);

export default router;
