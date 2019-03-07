class Dfa {
  constructor(tuple) {
    this.delta = tuple.delta,
    this.startState = tuple['start-state'],
    this.finalStates = tuple['final-states'],
    this.alphabets = tuple.alphabets
  }

  doesAccept(inputString) {
    if (this.isValidInput(inputString)) {
      return this.finalStates.includes(
        inputString.split("").reduce((stateOfMachine, currentAlphabet) => {
          return this.delta[stateOfMachine][currentAlphabet]
        }, this.startState)
      )
    }
    return false;
  }

  isValidInput(inputString) {
    return inputString.split('').every((alphabet) => {
      return this.alphabets.includes(alphabet)
    })
  }
}

module.exports = Dfa;
