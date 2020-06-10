# Algorithm Code

The actual README for this project covers the majority of information needed to load test data and run the algorithm.

In that vein, the genetic part of the algorithm can be somewhat slow, and may produce sub-par results if parameters are not tuned well. Tuning can be somewhat difficult. Most parameters are defined at the top of both `algorithm.js` and at the top of `scoring.js`.

To bypass the genetic part of the algorithm and only use the greedy seeding portion, one can change the default `greedyOnly` parameter in function `runGeneticAlgorithm()` to be `true` instead of `false`. With that, the genetic algorithm will not be used, and only the greedy algorithm will run.

If performance is of particular concern, it may be beneficial to do this; otherwise the genetic algorithm has the possibility of returning higher-scoring project assignments.
