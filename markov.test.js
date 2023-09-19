"use strict";

const {MarkovMachine} = require("./markov");

describe("same source tests", function() {
  let machine;
  let sourceText;

  beforeAll(function() {
    sourceText = "This is a source text that never uses the same word twice."
    machine = new MarkovMachine(sourceText)
  })

  test("output should be equal to source", function () {
    expect(machine.getText()).toEqual(sourceText);
  });

  test("output should be equal to source", function () {
    expect(machine.getText()).not.toEqual("This is a source.");
  });
})

describe("test with branches", function() {
  let machine;
  let sourceText;

  beforeAll(function() {
    sourceText = "the cat is fat in the hat with the rat in Matt"
    machine = new MarkovMachine(sourceText)
  })

  test("test .getChains() returns object", function () {
    expect(machine.getChains()).toEqual(expect.any(Object));
  });

  test("length of chains are correct", function () {
    expect(machine.getChains()["the"].length).toEqual(3);
  });

  test("last word is Matt", function () {
    expect(machine.getText().endsWith("Matt")).toEqual(true);
  });

  test("last word is not cat", function () {
    expect(machine.getText().endsWith("cat")).not.toEqual(true);
  });

  test("starts with 'the'", function () {
    expect(machine.getText().startsWith("the")).toEqual(true);
  });
})