# Algorithm Code

The actual README for this project covers the majority of information needed to load test data and run the algorithm.

In that vein, the genetic part of the algorithm can be somewhat slow, and may produce sub-par results if parameters are not tuned well. Tuning can be somewhat difficult. Most parameters are defined at the top of both `algorithm.js` and at the top of `scoring.js`.

To bypass the genetic part of the algorithm and only use the greedy seeding portion, one can change the default `greedyOnly` parameter in function `runGeneticAlgorithm()` to be `true` instead of `false`. With that, the genetic algorithm will not be used, and only the greedy algorithm will run.

If performance is of particular concern, it may be beneficial to do this; otherwise the genetic algorithm has the possibility of returning higher-scoring project assignments.

## Parameters
Some parameters are defined throughout the algorithm directory (the directory this README is in), which can be changed to alter the behavior of the program.

### In scoring.js:
The following parameters affect the weights of scores. For scale, each student on a maximally favorable project (where each student prefers each other and prefers the project) will have a score of about 6 (per student).
	- `PROJECT_PENALTY` is 5 by default, and is the penalty given for a student in a project they do not prefer.
	- `AVOID_PENALTY` is 7 by default, and is the penalty given for a student in a project with someone whom they wish to avoid.
	- `POP_BOUND_PENALTY` is 15 by default, and is the penalty given for a student in a project which is either full or overpopulated.
Positive scores are not adjustable as of (6/10/2020).

### In algorithm.js:
The following parameters affect how fast/randomly the GP algorithm acts. "Entropy" generally refers to the amount of randomness intorduced per operation. For example, `ENTROPY` refers to the amount of times students are randomly swapped per newly populated individual during the reproduction stage of GP.
	- `ENTROPY` is 10 by default, which means that 10 students will be swapped when generating a new individual from an existing fit individual.
	- `MUTATION_ENTROPY` is 2 by default, which means that 2 students will be swapped in a mutation.
	- `MUTATION_RATE` is 0.1 by default, which means that there is a 10% chance that mutations will occur between generations.
	- `MUTATION_SEED_OFFSET` is 1337 by default, which means that the seed is offset by 1337 to prevent resonance with other seeds in the program. (This number is chosen by random; after one use it seemed to give us good results).
