var projectSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "project",
    "description": "A project with students.",
    "type": "object",

    "properties": {
        "projectID": {
            "description": "The unique project ID.",
            "type": "integer"
        },

        "name": {
            "description": "The unique project name.",
            "type": "string"
        },

        "desc": {
            "description": "The project description",
            "type": "string"
        },

        "advisorID": {
            "description": "The ID of the advisor on this project.",
            "type": "integer"
        },

        "clientID": {
            "description": "The ID of the client on this project.",
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
        "studentID": {
            "description": "The student's ID in the DB.",
            "type": "integer"
        },

        "name": {
            "description": "The person's name.",
            "type": "string"
        },

        "username": {
            "description": "The person's username.",
            "type": "string"
        },

        "projectID": {
            "description": "The ID of the project that the person \
            will be working on.",
            "type": "integer"
        },

        "prefersTeam": {
            "description": "Whether the person prefers teammates or a project.",
            "type": "boolean"
        },

        "projectPreferences": {
            "description": "The names of the projects that the person prefers.",
            "type": "array"
        },

        "personPreferences": {
            "description": "The names of the people that the person prefers to work with.",
            "type": "array"
        },

        "personAvoidances": {
            "description": "The names of the people that the person would like to avoid.",
            "type": "array"
        }
    }
}