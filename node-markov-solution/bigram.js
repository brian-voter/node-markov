/** Textual markov chain generator using bigrams. */

const { MarkovMachine } = require("./markov");

class BigramMarkovMachine extends MarkovMachine {

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the cat": ["in"], "cat in": ["the"], "in the": ["hat"], "the hat": [null]} */

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length - 1; i += 1) {
      let bigram = this.words[i] + " " + this.words[i + 1];
      let nextWord = this.words[i + 2] || null;

      if (chains.has(bigram)) chains.get(bigram).push(nextWord);
      else chains.set(bigram, [nextWord]);
    }

    this.chains = chains;
  }

  /** Get a single link: the next word & next key. */

  _getOneLink(key) {
    let [w1, w2] = key.split(" ");
    return {
      word: w1,
      nextKey: w2 + " " + MarkovMachine.choice(this.chains.get(key)),
    };
  }
}


module.exports = {
  BigramMarkovMachine,
};