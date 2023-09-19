/** Command-line tool to generate bigram Markov text. */

const TextGenerator = require("./textGenerator");
const { BigramMarkovMachine } = require("./bigram");

// By having made our original TextGenerator in an OO style, it's now very
// easy to reuse it for bigrams.

const bigramTextGenerator = new TextGenerator(BigramMarkovMachine);

bigramTextGenerator.start(process.argv[2], process.argv[3]);
