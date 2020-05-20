class StudentRepository {
    constructor(model) {
        this.model = model;
    }

    create(name, username, id, projectId) {
        const student = { name, username, id, projectId };
        const studentModel = new this.model(student);

        return studentModel.save();
    }

    findAll() {
        return this.model.find();
    }

    findById(id) {
        return this.model.findById(id);
    }

    findByProjectId(projectId) {
        return this.model.findByProjectId(projectId);
    }

    deleteById(id) {
        return this.model.findAndDeleteById(id);
    }

    updateById(id, studentModel) {
        // TODO: Implement
    }
}

module.exports = new StudentRepository(Student);