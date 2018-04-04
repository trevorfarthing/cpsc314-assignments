'use strict';

// Global functions
function handleUserInput(text, minLength) {
  // Note: If a user cancels, enters an empty string, or invalid input, the function will reprompt them
  // (except in certain cases in some functions below)
  let input = prompt(text);
  while(input === null || input.length < minLength) {
    input = prompt(text);
  }
  return input;
}

function handleUserInputList(text) {
  let arr = [];
  while(arr.length < 1) {
    let input = handleUserInput(text, 1);
    arr = input.split(',');
  }
  let trimmedArr = arr.map((item) => item = item.trim());
  return trimmedArr;
}

// 1. Char Swap
function charSwap() {
  let input = handleUserInput('CHAR SWAP\nEnter some text at least 1 character long.', 1);
  return input[input.length - 1] + input.substring(1,input.length - 1) + input[0];
}

// 2. Hi String
function hiString() {
  let input = handleUserInput('HI STRING\nEnter some text at least 1 character long.', 1);
  if(input.startsWith('hi')) {
    return input;
  } else {
    return 'Hi' + input;
  }
}

// 3. Three Chars to Front
function threeCharsToFront() {
  let input = handleUserInput('THREE CHARS TO FRONTsdfg\nEnter some text at least 3 characters long.', 3);
  return input.substring(input.length - 3, input.length) + input.substring(0, input.length - 3);
}

// 4. Strings to Sentence
function stringsToSentence() {
  // User can enter more than 3, but only first 3 will be used
  let arr = [];
  while(arr.length < 3) {
    let input = handleUserInput('STRINGS TO SENTENCE\nEnter a list of 3 items separated by commas.', 1);
    arr = input.split(',');
  }
  let trimmedArr = arr.map((item) => item = item.trim());
  alert(`Your favorite thing is ${trimmedArr[0]}, you enjoy ${trimmedArr[1]}, and you don't like ${trimmedArr[2]}.`);
}

// 5. Upper or Lower
function upperOrLower() {
  let input = handleUserInput('UPPER OR LOWER\nEnter some text at least 1 character long.', 1);
  if(input.length < 3) {
    return input.toUpperCase();
  } else {
    return input.substr(0,3).toLowerCase() + input.substring(3, input.length);
  }
}

// 6. Integer Swap
function integerSwap() {
  let trimmedArr = handleUserInputList('INTEGER SWAP\nEnter a list of numbers separated by commas.');
  let numberArr = trimmedArr.map(Number);
  if(numberArr.includes(NaN)) {
    alert('You did not enter a list of only numbers.');
  }
  else {
    let temp = numberArr[0];
    numberArr[0] = numberArr[numberArr.length - 1];
    numberArr[numberArr.length - 1] = temp;
    alert(numberArr);
  }
}

// 7. Longest String
function longestString() {
  let trimmedArr = handleUserInputList('INTEGER SWAP\nEnter a list of strings separated by commas.');
  let maxLength = 0;
  let longestStr = '';
  trimmedArr.forEach(function(item) {
    if(item.length > maxLength) {
      maxLength = item.length;
      longestStr = item;
    }
  });
  alert('Longest String: ' + longestStr);
}

// 8. Largest Even Number
function largestEven() {
  let trimmedArr = handleUserInputList('LARGEST EVEN NUMBER\nEnter a list of numbers separated by commas.')
  let numberArr = trimmedArr.map(Number);
  if(numberArr.includes(NaN)) {
    alert('You did not enter a list of only numbers.');
  }
  let largestEven = -1;
  numberArr.forEach(function(item) {
    if(item % 2 === 0 && item > largestEven) {
      largestEven = item;
    }
  });
  if(largestEven === -1) {
    alert('You did not enter any even numbers');
  } else {
    alert('The largest even number is: ' + largestEven);
  }
}

// 9. Current Day Time
function currentDayTime() {
  let now = new Date();
  let ampm = now.getHours() >= 12? 'PM' : 'AM';
  let stdHours = now.getHours() % 12;
  if(stdHours === 0) {
    stdHours = 12;
  }
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  alert(`Today is ${days[now.getDay()]}.\nIt is ${stdHours}:${now.getMinutes()} ${ampm}.`);
}

// 10. Unlimited Function
function unlimitedFunction(...args) {
  let allArgsStr = '';
  args.forEach((item) => allArgsStr += item + ' ');
  alert(allArgsStr);
}
