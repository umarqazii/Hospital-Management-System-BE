create database hospital;
use hospital;

-- -----------------Tables Structures---------------------
create table users(
id INT PRIMARY KEY AUTO_INCREMENT,
email varchar(30),
pass varchar(30),
role varchar (15)
);

CREATE TABLE doctors (
    doctor_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    blood_group VARCHAR(3),
    gender VARCHAR(10),
    date_of_birth DATE,
    start_date DATE,
    department TEXT,
    experience TEXT,
    consultancy_rate INT,
    image_url VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE patients (
    patient_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    full_name VARCHAR(40),
    username varchar(30),
    mobile_no varchar (15),
    gender VARCHAR(10),
    date_of_birth DATE,
    joining_date DATE,
    department TEXT,
    city varchar(30),
    country varchar(30),
    image_url VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE invoices (
    invoice_id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id INT,
    doctor_id INT,
    consultation_fee INT,
    hospital_charges INT,
    equipment_charges INT,
    medicine_charges INT,
    total_amount INT,
    invoice_date DATE,
    status ENUM('unpaid', 'paid') DEFAULT 'unpaid',
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
);

-- -------Displaying Tables-----------------
select * from users;
select * from doctors;
select * from patients;
select * from invoices;

-- -----------Dropping Tables----------------
drop table users;
drop table doctors;
drop table patients;
drop table invoices;

-- ----------deleting from tables--------------
Delete from users where id = 4;
Delete from patients where user_id = ?;
Delete from doctors where user_id = ?;
Delete from invoices where invoice_id = ?;

-- -------Updating table row ------------------
UPDATE `hospital`.`users` SET `pass` = 'umar123' WHERE (`id` = '5');

-- -------------------------------------------------Inserting into Tables----------------------------------------------
-- User Table
INSERT INTO users (email, pass, role) VALUES
('admin@hospital.com', 'adminpass', 'admin');

-- ----Query to insert into Doctor's table as well as the user table simultaneously-------
-- Insert into the users table and get the new user's id
INSERT INTO users (email, pass, role) VALUES ('newdoctor@hospital.com', 'docpassword', 'doctor');
SET @user_id = LAST_INSERT_ID();

-- Insert into the doctors table using the obtained user_id
INSERT INTO doctors (user_id, first_name, last_name, blood_group, gender, date_of_birth, start_date, department, experience, consultancy_rate, image_url)
VALUES (@user_id, 'John', 'Doe', 'O+', 'Male', '1980-01-01', '2020-01-01', 'Cardiology', '10 years', 2000, 'http://localhost:8080/uploads/images/doctor_1.jpg');

-- ----Query to insert into Patient's table as well as the user table simultaneously-------
INSERT INTO users (email, pass, role) VALUES ('umarqazii@hotmail.com', 'Verbatin#123', 'patient');
SET @user_id = LAST_INSERT_ID();
INSERT INTO patients (user_id, full_name, username, mobile_no, gender, date_of_birth, joining_date, department, city, country, image_url) 
VALUES (@user_id, 'Umar Qazi', 'umarqazii', '03060253822', 'M', '2000-10-01', '2024-06-19', 'Rheumatology', 'Islamabad', 'Pakistan', 'http://localhost:8080/uploads/images/umar.jpg');


