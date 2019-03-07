const NfaToDfa = require('../src/nfa-to-dfa');
var Dfa = require('../src/dfa.js');
var testCases = require('../test-case.json');
var assert = require('assert');

describe('Nfa to Dfa test', () => {
  const tuple = {
    "states": [
      "q1",
      "q2"
    ],
    "alphabets": [
      "1",
      "0"
    ],
    "delta": {
      "q1": {
        "0": [
          "q1"
        ],
        "e": [
          "q2"
        ]
      },
      "q2": {
        "1": [
          "q2"
        ]
      }
    },
    "start-state": "q1",
    "final-states": [
      "q2"
    ]
  }

  it('should return true for empty string', () => {
    const nfaToDfa = new NfaToDfa(tuple);
    const dfa = new Dfa(nfaToDfa.generateDfaTuple())
    assert.ok(dfa.doesAccept("0"))  
  });
  
  describe('NFA to DFA test', () => {
    testCases.filter((testCase) => {
      return testCase.type == "nfa-to-dfa";
    }).forEach((testCase) => {
      const machine = new NfaToDfa(testCase.tuple);
      const dfaTuple = machine.generateDfaTuple();
      describe(`${testCase.name}`, () => {
        const dfaMachine = new Dfa(dfaTuple);
        testCase['pass-cases'].forEach((inputString) => {
          it(`should return true when the given string is ${inputString}`, (done) => {
            assert.ok(dfaMachine.doesAccept(inputString))
            done()
          });
        })
        testCase['fail-cases'].forEach((inputString) => {
          it(`should return false when the given string is ${inputString}`, () => {
            assert.ok(!dfaMachine.doesAccept(inputString))
          });
        })
      });
    })
  })
});
