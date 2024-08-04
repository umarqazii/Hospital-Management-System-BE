import { Router } from "express";
import { addPatient, deletePatient, getAllPatients, getPatientById, getAllPatientsWithoutPagination } from "../controllers/patientController";

const router = Router();

router.post("/add", addPatient);
router.delete("/delete/:id", deletePatient);
router.get("/all", getAllPatients);
router.get("/get-patient/:id", getPatientById);
router.get("/all-patients-without-pagination", getAllPatientsWithoutPagination);


export default router;