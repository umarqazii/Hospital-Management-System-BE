import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import pool from "../db"; // Ensure your database connection is set up correctly
import { generateRandomPassword } from "../utils/passwordutils";
import nodemailer from "nodemailer";

const secretKey = process.env.SECRET_KEY || "your_jwt_secret_key";

export const login = async (req: Request, res: Response) => {
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).send("Email and password are required");
  }

  const connection = await pool.getConnection();
  try {
    const [rows]: any[] = await connection.query(
      "SELECT * FROM users WHERE email = ? AND pass = ?",
      [email, pass]
    );
    if (Array.isArray(rows) && rows.length > 0) {
      const user = rows[0];
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1m" });
      res.status(200).send({ msg: "Login Successful", auth: true, token });
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  } finally {
    connection.release();
  }
};

export const protectedRoute = (req: Request, res: Response) => {
  res.status(200).send("Token is valid and user is authenticated.");
};


export const resetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required");
  }

  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
    if (Array.isArray(rows) && rows.length > 0) {
      const newPass = generateRandomPassword();
      await connection.query("UPDATE users SET pass = ? WHERE email = ?", [newPass, email]);

      res.status(200).send("Password reset successful, your new password is: " + newPass);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset",
        text: `Your new password is: ${newPass}`,
      };

      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } else {
      res.status(404).send("Email not found");
    }
  } catch (err) {
    res.status(500).send("Internal server error");
  } finally {
    connection.release();
  }
};
