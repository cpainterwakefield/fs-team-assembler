// TODO: This file barely works
// Credit to: http://www.theprojectspot.com/tutorial-post/applying-a-genetic-algorithm-to-the-travelling-salesman-problem/5
// for the outline, though!


/**
 * Credit to user "Laurens Holst" on the following SO thread.
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * There, they cite this as the "Durstenfeld shuffle."
 * 
 * @param {The array to be shuffled.} array 
 */
function shuffleArray(array) {
    // For every element in the array (except 0)...
    for (let i = array.length - 1; i > 0; i--) {
        // Gets a pseudorandom element to shuffle with
        const j = Math.floor(Math.random() * (i + 1));

        // Swaps array elements at positions i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
}

class City {
    constructor(x, y, rand = false) {
        if (rand) {
            let high = 200;
            let low = 0;

            this.x = Math.floor(Math.random() * (high - low + 1) + low);
            this.y = Math.floor(Math.random() * (high - low + 1) + low);
        } else {
            this.x = x;
            this.y = y;
        }
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    distanceTo(city) {
        let xDistance = Math.abs(this.getX() - city.getX());
        let yDistance = Math.abs(this.getY() - city.getY());

        return Math.sqrt((xDistance * xDistance) + (yDistance * yDistance));
    }

    toString() {
        let x = this.getX();
        let y = this.getY();

        return `${x}, ${y}`;
    }
}

class TourManager {
    static destinations = [];

    static addCity(city) {
        this.destinations.push(city);
    }

    static getCity(index) {
        return this.destinations[index];
    }
    
    static numberOfCities() {
        return this.destinations.length;
    }
}

class Tour {
    constructor() {
        this.tour = [];
        this.fitness = 0.0;
        this.distance = 0;

        for (let i = 0; i < TourManager.numberOfCities(); i++) {
            this.tour.push(null);
        }
    }

    generateIndividual() {
        for (let cityIndex = 0; 
            cityIndex < TourManager.numberOfCities(); cityIndex++) {
            this.setCity(cityIndex, TourManager.getCity(cityIndex));
        }

        shuffleArray(this.tour);
    }

    getCity(tourPosition) {
        return this.tour[tourPosition];
    }

    setCity(tourPosition, city) {
        this.tour[tourPosition] = city;

        // If the tour has been altered, we should reset the tour's stats
        this.fitness = 0;
        this.distance = 0;
    }

    getFitness() {
        if (this.fitness == 0) {
            this.fitness = 1.0 / this.getDistance();
        }

        return this.fitness;
    }

    getDistance() {
        if (this.distance == 0) {
            let tourDistance = 0;

            for (let cityIndex = 0; cityIndex < this.tourSize(); cityIndex++) {
                let fromCity = this.getCity(cityIndex);
                let destinationCity;

                if (cityIndex + 1 < this.tourSize()) {
                    destinationCity = this.getCity(cityIndex + 1);
                } else {
                    destinationCity = this.getCity(0);
                }

                tourDistance += fromCity.distanceTo(destinationCity);
            }

            this.distance = tourDistance;
        }

        return this.distance;
    }

    tourSize() {
        return this.tour.length;
    }

    containsCity(city) {
        return this.tour.includes(city);
    }

    toString() {
        let geneString = "| ";
        for (let i = 0; i < this.tourSize(); i++) {
            geneString = geneString + this.getCity(i).toString() + " | ";
        }

        return geneString;
    }
}

class Population {
    constructor(populationSize, initialize) {
        this.tours = [];

        if (initialize) {
            for (let i = 0; i < populationSize; i++) {
                let newTour = new Tour();
                newTour.generateIndividual();
                this.saveTour(i, newTour);
            }
        }
    }

    saveTour(index, tour) {
        this.tours[index] = tour;
    }

    getTour(index) {
        return this.tours[index];
    }

    getFittest() {
        let fittest = this.tours[0];

        for (let i = 1; i < this.populationSize(); i++) {
            if (fittest.getFitness() <= this.getTour(i).getFitness()) {
                fittest = this.getTour(i);
            }
        }

        return fittest;
    }

    populationSize() {
        return this.tours.length;
    }
}

class GeneticAlgorithm {
    static mutationRate = 0.015;
    static tournamentSize = 5;
    static elitism = true;

    static evolvePopulation(pop) {
        let newPopulation = new Population(pop.populationSize(), false);

        let elitismOffset = 0;
        if (this.elitism) {
            newPopulation.saveTour(0, pop.getFittest());
            elitismOffset = 1;
        }

        // Crossover the population, looping over the new population,
        // creating individuals from the current population
        for (let i = elitismOffset; i < newPopulation.populationSize(); i++) {
            let parent1 = this.tournamentSelection(pop);
            let parent2 = this.tournamentSelection(pop);
            let child = this.crossover(parent1, parent2);

            newPopulation.saveTour(i, child);
        }

        // Mutate the population a little bit so that the "gene pool"
        // for best possible tours does not get stale
        for (let i = elitismOffset; i < newPopulation.populationSize(); i++) {
            this.mutationRate(newPopulation.getTour(i));
        }

        return newPopulation;
    }

    static crossover(parent1, parent2) {
        let child = new Tour();

        // Get random start and end tour positions for parent1's tour
        let startPos = Math.floor(Math.random() * parent1.tourSize());
        let endPos = Math.floor(Math.random() * parent1.tourSize());

        // Loop and add the gene "spliced" sub-tour from parent1
        // to the child
        for (let i = 0; i < child.tourSize(); i++) {
            if (startPos < endPos && i > startPos && i < endPos) {
                child.setCity(i, parent1.getCity(i));
            } else if (startPos > endPos) {
                if (!(i < startPos && i > endPos)) {
                    child.setCity(i, parent1.getCity(i));
                }
            }
        }

        // Same thing, except with parent2
        for (let i = 0; i < parent2.tourSie(); i++) {
            if (!child.containsCity(parent2.getCity(i))) {
                for (let j = 0; j < child.tourSize(); j++) {
                    if (child.getCity(j) == null) {
                        child.setCity(j, parent2.getCity(i));
                        break;
                    }
                }
            }
        }

        return child;
    }

    static mutate(tour) {
        for (let pos1 = 0; pos1 < tour.tourSize(); pos1++) {
            if (Math.random() < mutationRate) {
                let pos2 = Math.floor(Math.random() * tour.tourSize());

                city1 = tour.getCity(pos1);
                city2 = tour.getCity(pos2);
                
                tour.setCity(pos2, city1);
                tour.setCity(pos1, city2);
            }
        }
    }

    static tournamentSelection(pop) {
        tournament = new Population(this.tournamentSize);

        for (let i = 0; i < this.tournamentSize; i++) {
            let randomId = Math.floor(Math.random() * pop.populationSize());
            tournament.saveTour(i, pop.getTour(randomId));
        }

        let fittest = tournament.getFittest();
        return fittest;
    }
}

function runSimulation() {
    let city = new City(60, 200);
    TourManager.addCity(city);
    let city2 = new City(180, 200);
    TourManager.addCity(city2);
    let city3 = new City(80, 180);
    TourManager.addCity(city3);
    let city4 = new City(140, 180);
    TourManager.addCity(city4);
    let city5 = new City(20, 160);
    TourManager.addCity(city5);
    let city6 = new City(100, 160);
    TourManager.addCity(city6);
    let city7 = new City(200, 160);
    TourManager.addCity(city7);
    let city8 = new City(140, 140);
    TourManager.addCity(city8);
    let city9 = new City(40, 120);
    TourManager.addCity(city9);
    let city10 = new City(100, 120);
    TourManager.addCity(city10);
    let city11 = new City(180, 100);
    TourManager.addCity(city11);
    let city12 = new City(60, 80);
    TourManager.addCity(city12);
    let city13 = new City(120, 80);
    TourManager.addCity(city13);
    let city14 = new City(180, 60);
    TourManager.addCity(city14);
    let city15 = new City(20, 40);
    TourManager.addCity(city15);
    let city16 = new City(100, 40);
    TourManager.addCity(city16);
    let city17 = new City(200, 40);
    TourManager.addCity(city17);
    let city18 = new City(20, 20);
    TourManager.addCity(city18);
    let city19 = new City(60, 20);
    TourManager.addCity(city19);
    let city20 = new City(160, 20);
    TourManager.addCity(city2);

    let pop = new Population(50, true);
    let originalDistance = JSON.parse(JSON.stringify(
        pop.getFittest().getDistance()));

    console.log("Initial distance: " + originalDistance.toString());

    pop = GeneticAlgorithm.evolvePopulation(pop);
    for (let i = 0; i < 100; i++) {
        pop = GeneticAlgorithm.evolvePopulation(pop);
    }

    console.log("Finished!");
    console.log("Final distance: " + pop.getFittest().getDistance().toString());
    console.log("Solution:");
    console.log(pop.getFittest().toString());
}

runSimulation();