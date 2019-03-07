exports.pushIfNotPresent = function (inputArray, state) {
  if (!inputArray.includes(state)) {
    inputArray.push(state);
  }
  return inputArray;
}

exports.concatIfNotPresent = function (inputArray, arrayToBeConcatenated) {
  var concatenatedArray = inputArray.concat(arrayToBeConcatenated);
  return concatenatedArray.filter(function (item, pos) { return item && concatenatedArray.indexOf(item) == pos});
}

getSubset = function (set,all) {
  // return set.reduce((subset, element) => {
    if(set.length===0) return all;
    let first = set[0];
  let combinedSet = all.map(ele => ele.concat(first));
  // return all.concat(combinedSet);
  all = all.concat(combinedSet);
  return getSubset(set.slice(1),all);
  // }, [[]])
}



// [1,2,3],[[],[1]]

exports.haveSameElements = function(firstArray, secondArray){
  return firstArray.every((element)=>secondArray.includes(element)) &&  secondArray.every((element)=> firstArray.includes(element))
}

// module.exports = getSubset;
