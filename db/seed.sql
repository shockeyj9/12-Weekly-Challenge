INSERT INTO department ( name)
VALUES
    ("Accounting"),
    ("Administration"),
    ("Marketing"),
    ("Human Resources"),
    ("Customer Service");

INSERT INTO role ( title,salary,department_id)
VALUES
    ("Tax Accountant",57418,1),
    ("General Accountant", 57418, 1),
    ("Administrative Manager",129691, 2),
    ("VP of Administration",129691, 2),
    ("Chief Administrative Officer",129691, 2),
    ("Marketing specialist",67054,3),
    ("HR Specialist",70209,4),
    ("Customer Support Specialist", 54471, 5)
    ;

INSERT INTO employee ( first_name,last_name,role_id, manager_id)
VALUES
    ("Theudemar", "Africa", 4, NULL), 
    ("Engelbert", "Joscelin", 5, 1), 
    ("Walt","Rahim",3, 2), 
    ("Omar", "Jem", 1,3),
    ("Venkat","Ida", 2,3),
    ("Diksha", "Kebede", 6,3),
    ("Ann" ,"Gael", 7,3),
    ("Nina" ,"Adela",8,3)
    ;

