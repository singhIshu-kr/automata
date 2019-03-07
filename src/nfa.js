const utils = require('./utils');
class Nfa {
  constructor(tuple) {
    this.delta = tuple.delta,
      this.startState = tuple['start-state'],
      this.finalState = tuple['final-states'],
      this.alphabets = tuple.alphabets
  }

  isAcceptableEndState(endStates, expectedEndStates) {
    return expectedEndStates.some((endState) => endStates.includes(endState));
  }

  getStableStates(states) {
    return states.reduce((stableState, state) => {
      return utils.concatIfNotPresent(stableState, this.getEpsilonState(state));
    }, []);
  }

  getEpsilonState(state, tempState = []) {
    if (this.delta[state] && this.delta[state]['e']) {
      tempState = utils.pushIfNotPresent(tempState, state);
      let nextStates = this.delta[state]['e'].filter((state) => !tempState.includes(state))
      nextStates.map((state) => {
        return this.getEpsilonState(state, utils.pushIfNotPresent(tempState, state));
      })
      return tempState;
    }
    return [state];
  }

  getNextState(currentState, alphabet) {
    if (this.delta[currentState] && this.delta[currentState][alphabet]) {
      let nextState = this.delta[currentState][alphabet]
      if (nextState.includes(currentState) || nextState.includes(this.delta[currentState]['e'])) {
        nextState = utils.concatIfNotPresent(nextState, this.delta[currentState]['e']);
      }
      return this.getStableStates(nextState);
    }
    return [];
  }

  doesAccept(inputString) {
    if (inputString.length == 0) {
      return this.isAcceptableEndState(this.getEpsilonState(this.startState), this.finalState)
    }
    let endResult = inputString.split("").reduce((currentStates, alphabet) => {
      currentStates = this.getStableStates(currentStates);
      return currentStates.reduce((nextState, currentState) => {
        return utils.concatIfNotPresent(nextState, this.getNextState(currentState, alphabet));
      }, [])
    }, [this.startState])
    return this.isAcceptableEndState(endResult, this.finalState);
  }
}

module.exports = Nfa;
