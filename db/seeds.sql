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

INSERT INTO `employee` (first_name, last_name, role_id, manager_id)
VALUES ("Devon", "Faria", 1, 1),
       ("Deb", "Sparr", 2, 1),
       ("Rebecca", "Hill", 6, 2),
       ("Heather", "Barnes", 5, 3),
       ("Michael", "Pearce", 7, 1),
       ("Johnny", "Pearce", 7, 1),
       ("Danielle", "Alfieri", 3, 1),
       ("Chris", "Spagnesi", 4, 5),
       ("Greg", "Hyde", 3, 1),
       ("Heather", "Smith", 4, 5);