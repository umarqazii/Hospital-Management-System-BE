import e, { Request, Response } from "express";
import pool from "../db";


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

  // get all invoices

  export const getAllInvoices = async (req: Request, res: Response) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query("SELECT * FROM invoices");
        res.status(200).send(rows);
    } catch (err) {
        res.status(500).send("Internal server error");
    } finally {
        connection.release();
    }
    }

    