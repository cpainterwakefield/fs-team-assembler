var projectSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "project",
    "description": "A project with students.",
    "type": "object",

    "properties": {
        "id": {
            "description": "The unique project ID.",
            "type": "integer"
        },

        "minPeople": {
            "description": "The minimum amount of people allowed on a project.",
            "type": "integer"
        },

        "maxPeople": {
            "description": "The maximum amount of people allowed on a project.",
            "type": "integer"
        },

        "people": {
            "description": "The people assigned to this project. Each array \
                element is a student object.",
            "type": "array"
        }
    }
};

var personSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "person",
    "description": "A person with preferences.",
    "type": "object",

    "properties": {
        "id": {
            "description": "The student's ID in the DB.",
            "type": "integer"
        },

        "prefersTeam": {
            "description" : "The selection preference for the student. If true, the student prefers to \
            be with teammates, if false, projects, if null, they don't care either way.",
            "type": "boolean"
        },

        "projectPreferences": {
            "description": "The IDs of the projects that the person prefers.",
            "type": "array"
        },

        "personPreferences": {
            "description": "The IDs of the people that the person prefers to work with.",
            "type": "array"
        },

        "personAvoidances": {
            "description": "The IDs of the people that the person would like to avoid.",
            "type": "array"
        }
    }
}