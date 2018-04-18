'use strict';

// Scroll to question
let scrollButtons = document.querySelectorAll('#selection button');
Object.keys(scrollButtons).forEach(function(key) {
  scrollButtons[key].onclick = function(event) {
    switch(event.target.innerHTML) {
      case '1':
        document.querySelector('#one').scrollIntoView(true);
        break;
      case '2':
        document.querySelector('#two').scrollIntoView(true);
        break;
      case '3':
        document.querySelector('#three').scrollIntoView(true);
        break;
      case '4':
        document.querySelector('#four').scrollIntoView(true);
        break;
      case '5':
        document.querySelector('#five').scrollIntoView(true);
        break;
    }
  };
});

// Question 1
let colorButtons = document.querySelectorAll('#one button');
let sectionOne = document.querySelector('#one');
colorButtons[0].onclick = function() {
  sectionOne.style.background = 'blue';
}
colorButtons[1].onclick = function() {
  sectionOne.style.background = 'green';
}

//Question 2
let toggleColorBtn = document.querySelector('#two button');
let sectionTwo = document.querySelector('#two');
toggleColorBtn.onclick = function() {
  if(toggleColorBtn.innerHTML === 'Click for pink!') {
    toggleColorBtn.innerHTML = 'Click for orange!';
    sectionTwo.style.background = 'pink';
  } else {
    toggleColorBtn.innerHTML = 'Click for pink!';
    sectionTwo.style.background = 'orange';
  }
}

// Question 3
let submitBtn = document.querySelector('#three button');
let list = document.querySelector('#three ul');
let input = document.querySelector('#three input');
submitBtn.onclick = function() {
  let listItem = document.createElement('li');
  listItem.innerHTML = input.value;
  list.appendChild(listItem);
}

// Question 4
let listItemsFour = document.querySelectorAll('#four li');
let listFour = document.querySelector('#four ul');
Object.keys(listItemsFour).forEach(function(key) {
  listItemsFour[key].onclick = function(event) {
    listFour.removeChild(listItemsFour[key]);
  }
});

// Question 5
let listItemsFive = document.querySelectorAll('#five li');
Object.keys(listItemsFive).forEach(function(key) {
  listItemsFive[key].onclick = function(event) {
    Object.keys(listItemsFive).forEach((i) => listItemsFive[i].style.background = 'transparent');
    listItemsFive[key].style.background = 'yellow';
  }
});
