const algorithm = require("../algorithm/algorithm.js");    

exports.run = (req, res) => {
    (async () => {
        let data = await algorithm.runGeneticAlgorithm();
        await res.send(data)
        await console.log("Genetic Algorithm Complete")
    })();
    console.log("Running genetic algorithm")
}

