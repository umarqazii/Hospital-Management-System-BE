import { Router } from "express";
import { login, resetPassword, protectedRoute } from "../controllers/authController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.post("/login", login);
router.get("/protected", authenticateToken, protectedRoute);
router.post("/reset-password", resetPassword);
router.get("/dashboard", authenticateToken, (req, res) => {
  res.status(200).send("Welcome to the Dashboard!");
});

export default router;
