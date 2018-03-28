'use strict';

function askUser() {
  let response = confirm('Confirm?');
  if(response) {
    console.log('User confirmed.');
  } else {
    console.log('User did not confirm.');
  }
}

function askUser2() {
  let stmt = confirm('Confirm?') ? 'User confirmed.' : 'User did not confirm';
  console.log(stmt);
}

askUser();
askUser2();

function askUserNumber() {
  let input = prompt('Enter a number');
  if(input === null) {
    alert('You clicked cancel.')
  } else if(input === '') {
    alert('You did not enter anything.');
  } else {
    let num = Number(input);
    if(isNaN(num)) {
      alert('You did not enter a number.');
    } else {
      alert('You entered ' + num + '.');
    }
  }
}

askUserNumber();

function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.fullName = function() {
    return this.year + ' ' + this.make + ' ' + this.model;
  };
  return this;
}

function copyObject(object, newKey=null, newVal=null) {
  let newObject = Object.assign({}, object);

  if(newKey !== null && newVal !== null) {
    newObject[newKey] = newVal;
  }
  return newObject;
}

let car1 = new Car('Chevrolet', 'Camaro', 2008);
let car2 = copyObject(car1, 'miles', 50000);

console.log('Car 1 ', car1);
console.log('Car 2 (copy) ', car2);
console.log(car1.fullName());
console.log(car2.fullName());

// function stringFunction(str1, str2, str3 = 'default string') {
//   return `${str1} ${str2} ${str3}`;
// }

// let stringFunction = function(str1, str2, str3 = 'default string') {
//   return `${str1} ${str2} ${str3}`;
// }

let stringFunction = (str1, str2, str3 = 'default string') => `${str1} ${str2} ${str3}`;

console.log(stringFunction('Hello', 'My name is Trevor'));
