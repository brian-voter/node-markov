/** Command-line tool to generate Markov text. */

const TextGenerator = require("./textGenerator");
const { MarkovMachine } = require("./markov");

const textGenerator = new TextGenerator(MarkovMachine);

textGenerator.start(process.argv[2], process.argv[3]);
