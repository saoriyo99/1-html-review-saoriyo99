-- SHOW DATABASES;

CREATE DATABASE IF NOT EXISTS classTest;

USE classTest; -- switch database 

DROP TABLE IF EXISTS student;
CREATE TABLE student (
	id int PRIMARY KEY AUTO_INCREMENT ,
    username varchar(24) UNIQUE NOT NULL,
    name varchar(48)
);

INSERT INTO student (id, username, name) VALUES 
(1, 'tomgreg', 'Tom Gregory'),
(2, 'beth1', 'Beth Barnhart'),
(3, 'bipin', 'Prof. Prabhakar');

-- SELECT * FROM students;

DROP TABLE IF EXISTS offer;
CREATE TABLE offer (
	id int PRIMARY KEY AUTO_INCREMENT,
    studentId int NOT NULL REFERENCES student(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
	companyName VARCHAR(24) NOT NULL DEFAULT '',
    salary int NOT NULL DEFAULT 0,
    bonus int NOT NULL DEFAULT 0,
	offerDate date NOT NULL DEFAULT(CURRENT_DATE)
);

-- Student 1 has no offers, Student 2 has 3 offers, Student 3 has one offer
INSERT INTO offer(id, studentId, companyName, salary, bonus, offerDate) VALUES
  (1, 2, 'KPMG', 95000, 7000, '2021-09-30'),
  (2, 2, 'Deloitte Digital', 94000, 12000, '2021-10-03'),
  (3, 2, 'IU, ISGP', 54000, 0, '2021-10-05'),
  (4, 3, 'Amazon', 122000, 11000, '2021-10-15')
;

-- COMMIT;

-- CREATE USER 'msisreader'@'%' IDENTIFIED BY 'msisreadonly';
-- GRANT SELECT ON * . * TO 'msisreader'@'%';

-- Book data
DROP TABLE IF EXISTS book;
CREATE TABLE book (
	id int PRIMARY KEY AUTO_INCREMENT ,
    title varchar(48) NOT NULL,
    author varchar(48) NOT NULL, 
    yearPublished int NOT NULL DEFAULT 0, 
    publisher varchar(48) NOT NULL,
    pages int NOT NULL DEFAULT 0,
    MSRP int NOT NULL DEFAULT 0
);

INSERT INTO book(id, title, author, yearPublished, publisher, pages, MSRP) VALUES 
    (1, 'Water for Elephants', 'Sara Gruen', 2006, 'Algonquin Books', 335, 12.99),
    (2, 'IT', 'Stephen King', 1986, 'Viking', 1138, 17.99),
    (3, 'Recursion', 'Blake Crouch', 2019, 'Random House Publishing Group', 336, 9.99),
    (4, 'The Power', 'Naomi Alderman', 2016, 'Viking', 400, 9.99)
;

ALTER TABLE offer
ADD COLUMN status enum("Unanswered", "Accepted", "Declined", "Negotiating")
NOT NULL DEFAULT 'Unanswered';

SELECT name, username, MAX(salary) AS maxSalary, COUNT(salary) AS offerCount
FROM student LEFT OUTER JOIN offer ON student.id = offer.studentId
GROUP BY username, name
;