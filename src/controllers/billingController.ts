import e, { Request, Response } from "express";
import pool from "../db";

// CREATE TABLE invoices (
//     invoice_id INT PRIMARY KEY AUTO_INCREMENT,
//     patient_id INT,
//     doctor_id INT,
//     consultation_fee INT,
//     hospital_charges INT,
//     equipment_charges INT,
//     medicine_charges INT,
//     total_amount INT,
//     invoice_date DATE,
//     status ENUM('unpaid', 'paid') DEFAULT 'unpaid',
//     FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
//     FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
// );

export const addInvoice = async (req: Request, res: Response) => {
    const { patient_id, doctor_id, consultation_fee, hospital_charges, equipment_charges, medicine_charges, total_amount } = req.body;
    // add invoice date in the format of 'YYYY-MM-DD'
    const invoice_date = new Date().toISOString().split('T')[0];
    if (!patient_id || !doctor_id || !consultation_fee || !hospital_charges || !equipment_charges || !medicine_charges || !total_amount || !invoice_date) {
        return res.status(400).send("All fields are required");
    }
    const connection = await pool.getConnection();
    try {
        await connection.query("INSERT INTO invoices (patient_id, doctor_id, consultation_fee, hospital_charges, equipment_charges, medicine_charges, total_amount, invoice_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [patient_id, doctor_id, consultation_fee, hospital_charges, equipment_charges, medicine_charges, total_amount, invoice_date]);
        res.status(200).send("Invoice added successfully");
    } catch (err) {
        res.status(500).send("Internal server error");
    } finally {
        connection.release();
    }
    
  };