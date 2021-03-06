-- Inserts dummy projects into DB
INSERT INTO projects (name, min_students, max_students) VALUES ('project1', 4, 5);
INSERT INTO projects (name, min_students, max_students) VALUES ('project2', 2, 4);
INSERT INTO projects (name, min_students, max_students) VALUES ('project3', 3, 5);


-- Inserts dummy students into DB
INSERT INTO students (name,selection_preference, first_project, second_project, third_project, email) VALUES ('devon', true, 1, 2, 3, 'devon@mines.edu');

INSERT INTO students (name,selection_preference, first_project, second_project, third_project, email) VALUES ('clive', true, 3, 1, 2, 'clive@mines.edu');

INSERT INTO students (name,selection_preference, first_project, second_project, third_project, email) VALUES ('bob'. true, 3, 2, 1, 'bob@mines.edu');

INSERT INTO students (name,selection_preference, first_project, second_project, third_project, email) VALUES ('alice', true, 2, 3, 1, 'alice@mines.edu');


-- Extra students for testing avoids
INSERT INTO students (name,selection_preference, first_project, second_project, third_project, email) VALUES ('duncan', false, 1, 2, 3, 'duncan@mines.edu');

INSERT INTO students (name,selection_preference, first_project, second_project, third_project, email) VALUES ('cathy', false, 1, 2, 3, 'cathy@mines.edu');

INSERT INTO students (name,selection_preference, first_project, second_project, third_project, email) VALUES ('barbara', false, 1, 2, 3, 'barbara@mines.edu');

INSERT INTO students (name,selection_preference, first_project, second_project, third_project, email) VALUES ('adam', false, 1, 2, 3, 'adam@mines.edu');


-- Inserts student preferences into DB
-- Student 1 (Devon):
INSERT INTO prefer_teammate_xrefs (student_id, preferree_id) VALUES (1, 2);
INSERT INTO prefer_teammate_xrefs (student_id, preferree_id) VALUES (1, 3);
INSERT INTO prefer_teammate_xrefs (student_id, preferree_id) VALUES (1, 4);

-- Student 2 (Clive):
INSERT INTO prefer_teammate_xrefs (student_id, preferree_id) VALUES (2, 1);
INSERT INTO prefer_teammate_xrefs (student_id, preferree_id) VALUES (2, 3);
INSERT INTO prefer_teammate_xrefs (student_id, preferree_id) VALUES (2, 4);

-- Student 3 (Bob):
INSERT INTO prefer_teammate_xrefs (student_id, preferree_id) VALUES (3, 1);
INSERT INTO prefer_teammate_xrefs (student_id, preferree_id) VALUES (3, 2);
INSERT INTO prefer_teammate_xrefs (student_id, preferree_id) VALUES (3, 4);

-- Student 4 (Alice):
INSERT INTO prefer_teammate_xrefs (student_id, preferree_id) VALUES (4, 1);
INSERT INTO prefer_teammate_xrefs (student_id, preferree_id) VALUES (4, 2);
INSERT INTO prefer_teammate_xrefs (student_id, preferree_id) VALUES (4, 3);


-- Inserts student avoids into DB
-- Student 1:
INSERT INTO avoid_teammate_xrefs (student_id, avoidee_id) VALUES (1, 5);
INSERT INTO avoid_teammate_xrefs (student_id, avoidee_id) VALUES (1, 6);
INSERT INTO avoid_teammate_xrefs (student_id, avoidee_id) VALUES (1, 7);

-- Student 2:
INSERT INTO avoid_teammate_xrefs (student_id, avoidee_id) VALUES (2, 5);
INSERT INTO avoid_teammate_xrefs (student_id, avoidee_id) VALUES (2, 6);
INSERT INTO avoid_teammate_xrefs (student_id, avoidee_id) VALUES (2, 7);

-- Student 3:
INSERT INTO avoid_teammate_xrefs (student_id, avoidee_id) VALUES (3, 5);
INSERT INTO avoid_teammate_xrefs (student_id, avoidee_id) VALUES (3, 7);
INSERT INTO avoid_teammate_xrefs (student_id, avoidee_id) VALUES (3, 4);

-- Student 4:
INSERT INTO avoid_teammate_xrefs (student_id, avoidee_id) VALUES (4, 6);
INSERT INTO avoid_teammate_xrefs (student_id, avoidee_id) VALUES (4, 7);
INSERT INTO avoid_teammate_xrefs (student_id, avoidee_id) VALUES (4, 3);
