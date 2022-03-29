USE emptracker_db;

INSERT INTO `department` (name)
VALUES ("Web Development"),
       ("Data Science"),
       ("Executive Management"),
       ("Accounting");

INSERT INTO `role` (title, salary, department_id)
VALUES ("CEO", 200000, 3),
       ("CFO", 180000, 3),
       ("Web Developer", 120000, 1),
       ("Intern", 50000, 1),
       ("Accountant", 150000, 4),
       ("Accounts Manager", 180000, 4),
       ("MySQL Engineer", 120000, 2);

INSERT INTO `employee` (first_name, last_name, role_id)
VALUES ("Devon", "Faria", 1),
       ("Deb", "Sparr", 2),
       ("Rebecca", "Hill", 6),
       ("Heather", "Barnes", 5),
       ("Michael", "Pearce", 7),
       ("Johnny", "Pearce", 7),
       ("Danielle", "Alfieri", 3),
       ("Chris", "Spagnesi", 4),
       ("Greg", "Hyde", 3),
       ("Heather", "Smith", 4);