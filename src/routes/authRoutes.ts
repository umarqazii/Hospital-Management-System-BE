import { Router } from "express";
import { login, resetPassword } from "../controllers/authController";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.post("/login", login);
router.post("/reset-password", resetPassword);
router.get("/dashboard", verifyToken, (req, res) => {
  res.status(200).send("Welcome to the Dashboard!");
});

export default router;
