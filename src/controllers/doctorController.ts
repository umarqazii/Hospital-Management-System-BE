import { Request, Response } from "express";
import pool from "../db";
import { generateEmail } from "../utils/emailUtils";
import { generateRandomPassword } from "../utils/passwordutils";

export const addDoctor = async (req: Request, res: Response) => {
  const { firstName, lastName, gender, bloodGroup, dateOfBirth, startDate, department, experience, consultancy_rate,pictureurl } = req.body;
  if (!firstName || !lastName || !gender || !bloodGroup || !dateOfBirth || !startDate || !department || !experience || !pictureurl ||!consultancy_rate) {
    return res.status(400).send("All fields are required");
  }
  const connection = await pool.getConnection();
  const email = generateEmail(firstName, lastName);
  const pass = generateRandomPassword();

  try {
    await connection.query("INSERT INTO users (email, pass, role) VALUES (?, ?, ?)", [email, pass, "doctor"]);
    await connection.query("SET @user_id = LAST_INSERT_ID();");
    await connection.query(
      "INSERT INTO doctors (user_id, first_name, last_name, blood_group, gender, date_of_birth, start_date, department, experience, consultancy_rate, image_url) VALUES (@user_id, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
      [firstName, lastName, bloodGroup, gender, dateOfBirth, startDate, department, experience, consultancy_rate,pictureurl]
    );
    res.status(200).send("Doctor added successfully");
  } catch (err) {
    res.status(500).send("Internal server error");
  } finally {
    connection.release();
  }
};

export const deleteDoctor = async (req: Request, res: Response) => {
  const user_id = req.params.id;
  const connection = await pool.getConnection();
  try {
    await connection.query("DELETE FROM doctors WHERE user_id = ?", [user_id]);
    await connection.query("DELETE FROM users WHERE id = ?", [user_id]);
    res.status(200).send("Doctor deleted successfully");
  } catch (err) {
    res.status(500).send("Internal server error");
  } finally {
    connection.release();
  }
};

export const getAllDoctors = async (req: Request, res: Response) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM doctors");
    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send("Internal server error");
  } finally {
    connection.release();
  }
};

export const getDoctorById = async (req: Request, res: Response) => {
  const user_id = req.params.id;
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM doctors WHERE user_id = ?", [user_id]);
    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send("Internal server error");
  } finally {
    connection.release();
  }
};
