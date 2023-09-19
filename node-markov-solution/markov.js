/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   * 
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null]
   *  }
   * 
   * */

  getChains() {
    const chains = new Map();

    for (let i = 0; i < this.words.length; i += 1) {
      const word = this.words[i];
      const nextWord = this.words[i + 1] || null;

      if (chains.has(word)) {
        chains.get(word).push(nextWord);
      } else {
        chains.set(word, [nextWord]);
      }
    }
    return chains;
  }


  /** Pick random choice from array. */

  static choice(items) {
    return items[Math.floor(Math.random() * items.length)];
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // - start at the first word in the input text (this will be the
    //     first key in the chains map, as JS remembers key insertion order)
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    const out = [];
    let key = this.words[0];

    // Produce markov chain until reaching termination word.
    while (key !== null) {
      const { word, nextKey } = this._getOneLink(key);
      out.push(word);
      key = nextKey;
    }

    return out.join(" ");
  }

  /** Get a single link: the next word & next key. */

  _getOneLink(key) {
    return {
      word: key,
      nextKey: MarkovMachine.choice(this.chains.get(key)),
    };
  }
}


module.exports = {
  MarkovMachine,
};
