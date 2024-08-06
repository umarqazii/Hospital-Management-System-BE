import { Router } from "express";
import { addInvoice, getAllInvoices } from "../controllers/billingController";


const router = Router();

router.post("/add", addInvoice);
router.get("/all", getAllInvoices);

export default router;