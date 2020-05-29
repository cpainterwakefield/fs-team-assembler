

exports.findAll = (req, res) => {
    const title = req.query.title;

    // !!! THIS could be where SQL injections happen--check for security here !!!
    // let conditionResult = { title: { [Op.iLike]: `%${title}%` } }
    // var condition = title ? conditionResult : null;

    Student.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Students."
            });
        });
};