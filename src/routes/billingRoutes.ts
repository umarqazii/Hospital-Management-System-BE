import { Router } from "express";
import { addInvoice } from "../controllers/billingController";

const router = Router();

router.post("/add", addInvoice);

export default router;