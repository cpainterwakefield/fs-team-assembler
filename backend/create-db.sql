CREATE TABLE users(
    id INTEGER PRIMARY KEY,
    auth_id INTEGER UNIQUE,
    email TEXT,
    name TEXT,
    is_admin BOOLEAN NOT NULL
);

CREATE TABLE student(
    users_id INTEGER,
    project_id INTEGER,
    selection_preference BOOLEAN, -- TRUE = teammates, FALSE = project, NULL = ambivalent
    FOREIGN KEY (users_id) REFERENCES users(id),
    FOREIGN KEY (project_id) REFERENCES project(id)
);

CREATE TABLE advisor(
    users_id INTEGER,
    FOREIGN KEY (users_id) REFERENCES users(id)
);

CREATE TABLE client(
    id INTEGER PRIMARY KEY,
    name TEXT
);

CREATE TABLE project(
    id INTEGER PRIMARY KEY,
    name TEXT,
    description TEXT,
    advisor_id INTEGER,
    client_id INTEGER,
    min_students INTEGER,
    max_students INTEGER
    FOREIGN KEY (advisor_id) REFERENCES advisor(id),
    FOREIGN KEY (client_id) REFERENCES client(id)
);

CREATE TABLE prefer_project_xref(
    preferrer_id INTEGER,
    project_id INTEGER,
    PRIMARY KEY (preferrer_id, project_id),
    FOREIGN KEY (preferrer_id) REFERENCES student(id),
    FOREIGN KEY (project_id) REFERENCES project(id)
);

CREATE TABLE prefer_teammate_xref(
    preferrer_id INTEGER,
    preferree_id INTEGER,
    PRIMARY KEY (preferrer_id, preferree_id),
    FOREIGN KEY (preferrer_id) REFERENCES student(id),
    FOREIGN KEY (preferee_id) REFERENCES student(id)
);

CREATE TABLE avoid_teammate_xref(
    avoider_id INTEGER,
    avoidee_id INTEGER,
    PRIMARY KEY (avoider_id, avoidee_id),
    FOREIGN KEY (avoider_id) REFERENCES student(id),
    FOREIGN KEY (avoidee_id) REFERENCES student(id)
);
