var assert = require('assert');
var Dfa = require('../src/dfa.js');
var testCases = require('../test-case.json');

describe('DFA', function () {
  describe('Own Cases', () => {
    let machine;
    const tuple = {
      states: ['q1', 'q2'],
      alphabets: ['1', '0'],
      delta: { q1: { '0': 'q2', '1': 'q1' }, q2: { '0': 'q1', '1': 'q2' } },
      'start-state': 'q1',
      'final-states': ['q2']
    }
    machine = new Dfa(tuple);
    it('should return true when the given string has odd number of 0', function () {
      assert.ok(machine.doesAccept('0'));
    });
    it('should return false when the given string has even number of 0', function () {
      assert.ok(!machine.doesAccept('00'));
    });

    it('should return false when the given string has invalid alphabets', function () {
      assert.ok(!machine.doesAccept('01212'));
    });
  })

  describe('DFA tests', () => {
    testCases.filter((testCase) => {
      return testCase.type == "dfa";
    }).forEach((testCase) => {
      const machine = new Dfa(testCase.tuple);
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
})
