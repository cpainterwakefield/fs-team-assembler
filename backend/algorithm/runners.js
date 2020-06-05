/**
 * runners.js
 * 
 * Contains the functions for running the algorithm.
 * Some of these runners do not involve full utilization of the algorithm;
 * they are mainly for testing.
 * 
 * @author Jeremiah Navarro
 * @author Miles Claver
 */

const dbInt = require('./db_interactions');
const algorithm = require('./algorithm');

async function convertAndRunGreedy() {
    let algoJSON = (async () => { 
        const dbJSON = await dbInt.getDBJson();
        return dbInt.convertDBResponse(await dbJSON);
    })();
}

function convertAndRunGP() {

}

exports.convertAndRunGreedy = convertAndRunGreedy;
exports.convertAndRunGP = convertAndRunGreedy;