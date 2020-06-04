-- query to receive total numbe of students
SELECT COUNT(*) FROM students;

--query to receive total number of students who preferred team
SELECT COUNT(*) FROM students WHERE selection_preference = true;

--query to receive total number of students who preferred project 
SELECT COUNT(*) FROM students WHERE selection_preference = false;

--query to receive total number of students who have no preference 
SELECT COUNT(*) FROM students WHERE selection_preference = null;

-- query to receive number of students who have submitted data
SELECT COUNT(*) FROM students WHERE gpa IS NOT NULL;

-- query to receive number of students who preferred team AND got a preferred team member
SELECT COUNT(*) FROM students WHERE selection_preference = true; -- need to finish

-- query to receive number of students who preferred project AND got a preferred project
SELECT COUNT(*) FROM students WHERE selection_preference = false AND (project_id = first_project OR project_id = second_project OR project_id = third_project);

-- query to receive number of students with no preference AND got either a teammate or project they wanted
SELECT COUNT(*) FROM students WHERE selection_preference IS NULL; -- need to finish

-- query to receive number of students who were assigned to the first project they chose
SELECT COUNT(*) FROM students WHERE project_id = first_project;

-- query to receive number of students who were assigned to the second project they chose
SELECT COUNT(*) FROM students WHERE project_id = second_project;

-- query to receive number of students who were assigned to the third project they chose
SELECT COUNT(*) FROM students WHERE project_id = third_project;

