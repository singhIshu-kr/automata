const utils = require('./utils');
const Nfa = require('./nfa');

class NfaToDfa {
  constructor(tuple) {
    this.nfa = new Nfa(tuple),
    this.states = tuple.states,
    this.startState = tuple['start-state'],
    this.finalState = tuple['final-states'],
    this.alphabets = tuple.alphabets,
    this.dfaStates = getSubset(this.states, [[]])
  }

  getNextState(states, alphabet) {
    return states.reduce((nextStates, state) => {
      return utils.concatIfNotPresent(nextStates, this.nfa.getNextState(state, alphabet));
    }, []).sort();
  }

  generateDelta() {
    return this.dfaStates.reduce((delta,state) => {
      let deltaOfState = this.alphabets.reduce((deltaOfState, alphabet) => {
        deltaOfState[alphabet] = this.getNextState(state, alphabet).toString();
        return deltaOfState;
      },{})
      delta[state] = deltaOfState;
      return delta
    }, {});
  }

  getFinalState() {
    let finalStateSets = this.dfaStates.filter((states)=>{
      return states.some(state=> this.finalState.includes(state))
    })
    return finalStateSets.reduce((finalStates, state)=>{return [state.toString(), ...finalStates]},[])
  }

  generateDfaTuple(){
    let tuple = {};
    tuple['alphabets'] = this.alphabets;
    tuple['delta'] = this.generateDelta();
    tuple['start-state'] = this.nfa.getEpsilonState(this.startState).sort().toString();
    tuple['final-states'] = this.getFinalState()
    return tuple;
  }
}

getSubset = function (set, subsets) {
  if (set.length === 0) return subsets;
  let first = set[0];
  let combinedSet = subsets.map(ele => ele.concat(first).sort());
  subsets = subsets.concat(combinedSet);
  return getSubset(set.slice(1), subsets);
}



module.exports = NfaToDfa;

