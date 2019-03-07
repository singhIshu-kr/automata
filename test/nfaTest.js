var assert = require('assert');
var NFA = require('../src/nfa.js');
var testCases = require('../test-case.json');

describe('NFA test', () => {
  describe('Own test', () => {
    const nfaTuple = {
      states: ['q1', 'q3', 'q7', 'q2', 'q5', 'q6', 'q4'],
      alphabets: ['1', '0'],
      delta: {
        q1: { 'e': ['q2', 'q5'] },
        q2: { '0': ['q3'] },
        q3: { '1': ['q4'] },
        q4: { '0': ['q3'] },
        q5: { '1': ['q6'] },
        q6: { '0': ['q7'] },
        q7: { '1': ['q6'] }
      },
      'start-state': 'q1',
      'final-states': ['q3', 'q6']
    };

    const machine = new NFA(nfaTuple);
    it('should return true when the given string has odd number of 0', function () {
      assert.ok(machine.doesAccept('0'));
    });
    it('should return false when the given string has even number of 0', function () {
      assert.ok(!machine.doesAccept('10'));
    });

    it('should return false when the given string has invalid alphabets', function () {
      assert.ok(!machine.doesAccept('01212'));
    });
  })
})

describe('NFA tests', () => {
  testCases.filter((testCase) => {
    return testCase.type == "nfa";
  }).forEach((testCase) => {
    const machine = new NFA(testCase.tuple);
    describe(`${testCase.name}`, () => {
      testCase['pass-cases'].forEach((inputString) => {
        it(`should return true when the given string is ${inputString}`, (done) => {
          assert.ok(machine.doesAccept(inputString))
          done()
        });
      })
      testCase['fail-cases'].forEach((inputString) => {
        it(`should return false when the given string is ${inputString}`, () => {
          assert.ok(!machine.doesAccept(inputString))
        });
      })
    });
  })
})

