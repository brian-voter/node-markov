"use strict";

/** Textual markov chain generator. */

class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */
  getChains() {
    const newChains = {};

    for (let i = 0; i < this.words.length; i++) {
      const chain = newChains[this.words[i]] || [];

      const word = (i < this.words.length - 1) ? this.words[i + 1] : null;
      chain.push(word);

      newChains[this.words[i]] = chain;
    }

    return newChains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    let string = [];
    let word = this.words[0];

    do {
      string.push(word);

      const chain = this.chains[word];
      word = chain[this.getRandInt(chain.length)];
    } while (word != null);
    debugger;
    return string.join(" ");
  }

  /**
   * Gets a random integer from 0 (incl) to max (excl).
   * @param {number} max
   * @returns {number}
   */
  getRandInt(max) {
    return Math.floor(Math.random() * max);
  }
}



module.exports = {
  MarkovMachine,
};