CREATE TABLE users(
    id INTEGER PRIMARY KEY,
    auth_id INTEGER UNIQUE,
    email TEXT,
    name TEXT,
    is_admin BOOLEAN NOT NULL
);

CREATE TABLE advisor(
    users_id INTEGER,
    FOREIGN KEY (users_id) REFERENCES users(id)
);

CREATE TABLE client(
    id INTEGER PRIMARY KEY,
    name TEXT,
    contact_email TEXT,
    company_name TEXT
);

CREATE TABLE project(
    id INTEGER PRIMARY KEY,
    name TEXT,
    description TEXT,
    advisor_id INTEGER,
    client_id INTEGER,
    min_students INTEGER,
    max_students INTEGER,
    FOREIGN KEY (advisor_id) REFERENCES advisor(id),
    FOREIGN KEY (client_id) REFERENCES client(id)
);

CREATE TABLE student(
    id INTEGER PRIMARY KEY,
    users_id INTEGER,
    name TEXT,
    selection_preference BOOLEAN, -- TRUE = teammates, FALSE = project, NULL = ambivalent
    gpa NUMERIC(4, 3), -- 4 digits total, 3 decimal places
    minor TEXT,
    username TEXT NOT NULL,
    project_id INTEGER REFERENCES project(id)
    first_project INTEGER REFERENCES project(id)
    second_project INTEGER REFERENCES project(id)
    third_project INTEGER REFERENCES project(id)
);


CREATE TABLE prefer_teammate_xref(
    preferrer_id INTEGER,
    preferree_id INTEGER,
    PRIMARY KEY (preferrer_id, preferree_id),
    FOREIGN KEY (preferrer_id) REFERENCES student(id),
    FOREIGN KEY (preferree_id) REFERENCES student(id)
);

CREATE TABLE avoid_teammate_xref(
    avoider_id INTEGER,
    avoidee_id INTEGER,
    PRIMARY KEY (avoider_id, avoidee_id),
    FOREIGN KEY (avoider_id) REFERENCES student(id),
    FOREIGN KEY (avoidee_id) REFERENCES student(id)
);
