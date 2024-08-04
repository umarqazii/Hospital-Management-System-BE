import { Router } from "express";
import { addDoctor, deleteDoctor, getAllDoctors, getDoctorById } from "../controllers/doctorController";

const router = Router();

router.post("/add", addDoctor);
router.delete("/delete/:id", deleteDoctor);
router.get("/all", getAllDoctors);
router.get("/get-doctor/:id", getDoctorById);

export default router;
