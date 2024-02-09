-- Database Created with name PRISON
CREATE DATABASE PRISON;

-- Using Database
USE PRISON;

-- Prison Table
CREATE TABLE PRISON(
	prison_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	prison_name VARCHAR(255) UNIQUE,
	prison_capacity INT NOT NULL,
	current_prisoner INT NOT NULL DEFAULT 0
);

-- Cell table
CREATE TABLE CELL(
	cell_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	cell_no INT NOT NULL UNIQUE,
	cell_floor INT NOT NULL
);

-- Prisoner Table
CREATE TABLE PRISONER(
	prisoner_id INT AUTO_INCREMENT PRIMARY KEY,
	prisoner_name VARCHAR(255) NOT NULL,
	prisoner_state VARCHAR(100) NOT NULL,
	prisoner_country VARCHAR(100) NOT NULL,
	prisoner_pincode BIGINT NOT NULL,
	prison_id INT NOT NULL,
	arrival_time TIME NOT NULL,
	cell_id INT NOT NULL,
	FOREIGN KEY (prison_id) REFERENCES PRISON(prison_id),
	FOREIGN KEY (cell_id) REFERENCES CELL(cell_id)
); 

-- Crime Table
CREATE TABLE CRIME(
	prisoner_id INT NOT NULL,
	crime_name VARCHAR(255) NOT NULL,
	crime_details VARCHAR(255) NOT NULL,
	punishment_duration VARCHAR(255) NOT NULL,
	FOREIGN KEY (prisoner_id) REFERENCES PRISONER(prisoner_id)
);

-- Visiting Charges
CREATE TABLE VISITING_CHARGES(
	visiting_charges_id INT AUTO_INCREMENT PRIMARY KEY,
	visiting_charges INT NOT NULL	
);
INSERT INTO VISITING_CHARGES(visiting_charges) VALUES(200);
SELECT * FROM VISITING_CHARGES;

-- Visitor table
CREATE TABLE VISITOR (
	visitor_id INT AUTO_INCREMENT PRIMARY KEY,
	visitor_name VARCHAR(255) NOT NULL,
	contact_number BIGINT,
	visit_date DATETIME NOT NULL,
	visiting_charges_id INT NOT NULL,
	prisoner_id INT NOT NULL,
	purpose VARCHAR(255),
	FOREIGN KEY (prisoner_id) REFERENCES PRISONER(prisoner_id),
	FOREIGN KEY (visiting_charges_id) REFERENCES VISITING_CHARGES(visiting_charges_id)
);

-- Medical Diagnosis Table
CREATE TABLE MEDICAL_DIAGNOSIS (
    diagnosis_id INT AUTO_INCREMENT PRIMARY KEY,
    prisoner_id INT NOT NULL,
    diagnosis_date DATE NOT NULL,
    diagnosis_details TEXT,
    treating_physician VARCHAR(255),
    treatment_given TEXT,
    FOREIGN KEY (prisoner_id) REFERENCES PRISONER(prisoner_id)
);

-- Bill Table 
CREATE TABLE BILLING (
    billing_id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date_of_transaction DATE NOT NULL,
    billing_status ENUM("Paid", "Unpaid"),
    prisoner_id INT NOT NULL,
    FOREIGN KEY (prisoner_id) REFERENCES PRISONER(prisoner_id)
);

-- Prisoner Release
CREATE TABLE PRISONER_RELEASE (
    release_id INT AUTO_INCREMENT PRIMARY KEY,
    prisoner_id INT NOT NULL,
    release_date DATE NOT NULL,
    release_reason VARCHAR(255),
    FOREIGN KEY (prisoner_id) REFERENCES PRISONER(prisoner_id)
);

-- JOIN for getting prisoner cell no
SELECT p.prisoner_id, p.prisoner_name, c.cell_no, c.cell_floor
FROM PRISONER AS p
LEFT JOIN CELL AS c
ON p.cell_id = c.cell_id;

-- VIEW for gettig patient diagnosis details
CREATE VIEW get_medical_details AS
SELECT p.prisoner_id, p.prisoner_name, m.diagnosis_details, m.treating_physician, m.treatment_given
FROM PRISONER AS p
LEFT JOIN MEDICAL_DIAGNOSIS AS m
ON p.prisoner_id = m.prisoner_id;

-- STORED PROCEDURE FOR GeneratePrisonerBill
DELIMITER //
CREATE PROCEDURE GeneratePrisonerBill(IN prisoner_id INT)
BEGIN
    INSERT INTO BILLING (description, amount, date_of_transaction, billing_status, prisoner_id)
    SELECT 
        CONCAT('Total visiting charges for ', p.prisoner_name) AS description,
        (COUNT(v.prisoner_id) * vc.visiting_charges) AS amount,
        CURDATE() AS date_of_transaction,
        'Unpaid' AS billing_status,
        prisoner_id
    FROM PRISONER p
    LEFT JOIN VISITOR v ON p.prisoner_id = v.prisoner_id
    CROSS JOIN VISITING_CHARGES vc
    WHERE p.prisoner_id = prisoner_id
    GROUP BY p.prisoner_id, p.prisoner_name, vc.visiting_charges;
END //
DELIMITER ;

CALL GeneratePrisonerBill(1); -- Calling Stored Procedure

-- TRIGGER - generate bill when prisoner is released
DELIMITER //
CREATE TRIGGER GenerateReleaseBill
AFTER INSERT ON PRISONER_RELEASE
FOR EACH ROW
BEGIN
	CALL GeneratePrisonerBill(NEW.prisoner_id); -- called stored procedure inside trigger
END; //
DELIMITER ;

-- INDEX on prisoner_name 
CREATE INDEX index_prisoner_name ON PRISONER(prisoner_name);


-- PRISON table 
INSERT INTO PRISON(prison_name, prison_capacity, current_prisoner) VALUES("Mumbai Jail", 1000, 1000);
SELECT * FROM PRISON;

-- CELL table
INSERT INTO CELL(cell_no, cell_floor) VALUES(1, 0);
SELECT * FROM CELL;

-- PRISONER table
INSERT INTO PRISONER(prisoner_name, prisoner_state, prisoner_country, prisoner_pincode, prison_id, arrival_time, cell_id) 
VALUES ('Jane Smith', 'Another State', 'Another Country', 654321, 1, '13:00:00', 1);
select * from PRISONER; 

-- CRIME table
INSERT INTO CRIME(prisoner_id, crime_name, crime_details, punishment_duration) 
VALUES (6, 'Assault', 'Physically attacked someone', '3 years');
SELECT * FROM CRIME;

-- VISITING_CHARGES table
INSERT INTO VISITING_CHARGES(visiting_charges) VALUES(200);
SELECT * FROM VISITING_CHARGES;

-- VISITOR table
INSERT INTO VISITING_CHARGES(visiting_charges) VALUES(200);
SELECT * FROM VISITING_CHARGES;

-- MEDICAL_DIAGNOSIS
INSERT INTO MEDICAL_DIAGNOSIS(prisoner_id, diagnosis_date, diagnosis_details, treating_physician, treatment_given) 
VALUES (1, '2024-02-09', 'Fever and cough', 'Dr.Stev Smith', 'Prescribed antibiotics and rest.');
SELECT * FROM MEDICAL_DIAGNOSIS;

-- PRISONER_RELEASE table
INSERT INTO PRISONER_RELEASE (prisoner_id, release_date, release_reason)
VALUES (6, '2024-02-28', 'release because of Improvement in Behaviour');
SELECT * FROM PRISONER_RELEASE;

-- BILLING table
SELECT * FROM BILLING;