import e, { Request, Response } from "express";
import pool from "../db";

export const addPatient = async (req: Request, res: Response) => {
  const { full_name, username, email, pass, mobile_no, gender, date_of_birth, joining_date, department, city, country, image_url } = req.body;

  // Corrected conditional check
  if (!full_name || !username || !email || !pass || !mobile_no || !gender || !date_of_birth || !joining_date || !department || !city || !country || !image_url) {
    console.log(req.body);
    return res.status(400).send("All fields are required");
  }

  const connection = await pool.getConnection();

  try {
    await connection.query("START TRANSACTION");

    // Insert into users table
    await connection.query("INSERT INTO users (email, pass, role) VALUES (?, ?, ?)", [email, pass, "patient"]);
    await connection.query("SET @user_id = LAST_INSERT_ID();");

    // Insert into patients table
    await connection.query(
      "INSERT INTO patients (user_id, full_name, username, mobile_no, gender, date_of_birth, joining_date, department, city, country, image_url) VALUES (@user_id, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
      [full_name, username, mobile_no, gender, date_of_birth, joining_date, department,  city, country, image_url]
    );

    await connection.query("COMMIT");

    res.status(200).send("Patient added successfully");
  } catch (err) {
    await connection.query("ROLLBACK");
    res.status(500).send("Internal server error");
  } finally {
    connection.release();
  }
};
export const deletePatient = async (req: Request, res: Response) => {
    const user_id = req.params.id;
    console.log(user_id);
    const connection = await pool.getConnection();
    try {
      await connection.query("DELETE FROM patients WHERE user_id = ?", [user_id]);
      await connection.query("DELETE FROM users WHERE id = ?", [user_id]);
      res.status(200).send("Patient deleted successfully");
    } catch (err) {
      res.status(500).send("Internal server error");
    } finally {
      connection.release();
    }
  };

  export const getAllPatients = async (req: Request, res: Response) => {
    const connection = await pool.getConnection();
    try {
        // Get pagination parameters from query
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 3;
        const offset = (page - 1) * limit;

        // Query to get paginated patients
        const [rows] = await connection.query(
            "SELECT * FROM patients LIMIT ? OFFSET ?",
            [limit, offset]
        ) as [any[], any]; // Type assertion to extract rows

        // Query to get total count of patients
        const [[{ total }]] = await connection.query(
            "SELECT COUNT(*) AS total FROM patients"
        ) as [any[], any]; // Type assertion to extract total count

        res.status(200).send({
            patients: rows,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (err) {
        console.error(err); // Added console error for debugging
        res.status(500).send("Internal server error");
    } finally {
        connection.release();
    }
};

// get all patients without pagination
export const getAllPatientsWithoutPagination = async (req: Request, res: Response) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query("SELECT * FROM patients") as [any[], any]; // Type assertion to extract rows
        res.status(200).send(rows);
    } catch (err) {
        console.error(err); // Added console error for debugging
        res.status(500).send("Internal server error");
    } finally {
        connection.release();
    }
};

export const getPatientById = async (req: Request, res: Response) => {
    const user_id = req.params.id;
    console.log(req.params);
    console.log(user_id);
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query("SELECT * FROM patients WHERE user_id = ?", [user_id]);
      const [rows1] = await connection.query("SELECT email FROM users WHERE id = ?", [user_id]);
      //res.status(200).send(rows);
      res.status(200).send({rows,rows1});
    } catch (err) {
      res.status(500).send("Internal server error");
    } finally {
      connection.release();
    }
  };