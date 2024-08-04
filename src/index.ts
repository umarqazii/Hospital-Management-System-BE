import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import doctorRoutes from "./routes/doctorRoutes";
import patientRoutes from "./routes/patientRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import billingRoutes from "./routes/billingRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);
app.use("/upload", uploadRoutes);
app.use("/billing", billingRoutes);

// Endpoint to serve uploaded images
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
