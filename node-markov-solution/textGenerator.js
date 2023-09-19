/** Machine for making text. */

const fsP = require("fs/promises");
const axios = require("axios");


class TextGenerator {
  /** Make a generator: pass in a markov machine class.
   *
   * This allows this generator to be used with different kinds of Markov
   * machines, like a bigram-generating one.
   **/

  constructor(machineClass) {
    this.machineClass = machineClass;
  }

  /** Make Markov machine from text and generate text from it. */


  generateText(text) {
    let mm = new this.machineClass(text);
    console.log(mm.getText());
  }

  /** read file and generate text from it. */

  async textFromFile(path) {
    let content;
    try {
      content = await fsP.readFile(path, "utf8");
    } catch (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    }
    this.generateText(content);
  }

  /** read URL and make text from it. */

  async textFromUrl(url) {
    let resp;

    try {
      resp = await axios.get(url);
    } catch (err) {
      console.error(`Cannot read URL: ${url}: ${err}`);
      process.exit(1);
    }
    this.generateText(resp.data);
  }

  /** interpret cmdline to decide what to do. */

  async start(method, path) {
    if (method === "file") {
      await this.textFromFile(path);
    } else if (method === "url") {
      await this.textFromUrl(path);
    } else {
      console.error(`Unknown method: ${method}`);
      process.exit(1);
    }
  }
}

module.exports = TextGenerator;
