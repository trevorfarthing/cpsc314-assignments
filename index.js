'use strict';

let imageNumbers = ['1027','1011','1005','996','978','883','841','839','823', '669'];
// GET request to retrieve users
$.ajax({
  url:'https://jsonplaceholder.typicode.com/users',
  type: 'GET',
  dataType: 'json'
}).done((data) => {
  for(let user of data) {
    createUserBlock(user);
  }
});

function createUserBlock(user) {
  // Create main sections
  let userBlock = document.createElement('div');
  let basicInfo = document.createElement('div');
  let otherInfo = document.createElement('div');
  otherInfo.classList.add('other-info');
  basicInfo.classList.add('basic-info');
  userBlock.id = `user-block-${user.id}`;
  userBlock.loadedAlbums = [];
  userBlock.loadedTodos = [];
  userBlock.todosVisible = false;

  // Create buttons
  let button1 = document.createElement('div');
  button1.innerHTML = '<i id=caret-todos-' + user.id + ' class="ease-transition fas fa-caret-right"></i>View ToDos';
  button1.classList.add('button');
  button1.onclick = function() { onTodosClick(user.id); };
  let button2 = document.createElement('div');
  button2.innerHTML = '<i id=caret-albums-' + user.id + ' class="ease-transition fas fa-caret-right"></i>View Albums';
  button2.classList.add('button');
  button2.onclick = function() { onAlbumsClick(user.id) };
  // Create name block
  let name = document.createElement('div');
  name.innerHTML = user.name;
  name.classList.add('user-fullname');
  //Create email block
  let email = document.createElement('div');
  email.innerHTML = user.email;
  email.classList.add('user-info');
  // Create company block
  let company = document.createElement('div');
  company.innerHTML = user.company.name;
  company.classList.add('user-info');
  // User's image
  let image = document.createElement('img');
  image.src = 'https://picsum.photos/100/100?image=' + imageNumbers[user.id-1];
  // Create block to hold todos and albums
  let todosAlbums = document.createElement('div');
  todosAlbums.classList.add('todos-albums');
  todosAlbums.id = 'todos-albums-' + user.id;
  todosAlbums.style.display = 'none';

  // Append elements
  basicInfo.append(image);
  basicInfo.append(name);
  basicInfo.append(email);
  basicInfo.append(company);
  otherInfo.append(button1);
  otherInfo.append(button2);
  otherInfo.append(todosAlbums);
  userBlock.append(basicInfo);
  userBlock.append(otherInfo);
  userBlock.classList.add('user-block');
  $('#main-content').append(userBlock);
}

// Called when the 'View Todos' button is clicked
function onTodosClick(id) {
  let userBlock = document.getElementById(`user-block-${id}`);
  // If we have not loaded the todos yet, make API call
  if(userBlock.loadedTodos.length === 0) {
    $.ajax({
      url:`https://jsonplaceholder.typicode.com/todos?userId=${id}`,
      type: 'GET',
      dataType: 'json'
    }).done((data) => {
      userBlock.loadedTodos = data;
      displayTodos(id);
    });
  } else {
    displayTodos(id);
  }
}

// Handles the displaying of todos after the button is clicked
function displayTodos(id) {
  let userBlock = document.getElementById(`user-block-${id}`);
  if($(`#todos-albums-${id}`).is(':visible') === false) {
    fillTodos(id);
    $(`#caret-todos-${id}`).toggleClass('rotate');
    $(`#todos-albums-${id}`).slideToggle(600, null);
  }
  else if(!userBlock.todosVisible) {
    $(`#caret-albums-${id}`).toggleClass('rotate');
    $(`#todos-albums-${id}`).slideToggle(600, () => { fillTodos(id) });
    $(`#caret-todos-${id}`).toggleClass('rotate');
    $(`#todos-albums-${id}`).slideToggle(600, null);
  }
  else {
    $(`#caret-todos-${id}`).toggleClass('rotate');
    $(`#todos-albums-${id}`).slideToggle(600, null);
  }
  userBlock.todosVisible = true;
}

// Fills the todos into the div
function fillTodos(id) {
  let userBlock = document.getElementById(`user-block-${id}`);
  $(`#todos-albums-${id}`).empty();
  for(let todo of userBlock.loadedTodos) {
    let todoBlock = document.createElement('p');
    if(todo.completed == true) {
      todoBlock.innerHTML = `<i class="far fa-check-square"></i>${todo.title}`;
    } else {
      todoBlock.innerHTML = `<i class="far fa-square"></i>${todo.title}`;
    }
    $(`#todos-albums-${id}`).append(todoBlock);
  }
}

// Called when the 'View Albums' button is clicked
function onAlbumsClick(id) {
  let userBlock = document.getElementById(`user-block-${id}`);
  // If we have not loaded the albums yet, make API call
  if(userBlock.loadedAlbums.length === 0) {
    $.ajax({
      url:`https://jsonplaceholder.typicode.com/albums?userId=${id}`,
      type: 'GET',
      dataType: 'json'
    }).done((data) => {
      userBlock.loadedAlbums = data;
      displayAlbums(id);
    });
  } else {
    displayAlbums(id);
  }
}

// Handles the displaying of albums after the button is clicked
function displayAlbums(id) {
  let userBlock = document.getElementById(`user-block-${id}`);
  if($(`#todos-albums-${id}`).is(':visible') === false) {
    fillAlbums(id);
    $(`#caret-albums-${id}`).toggleClass('rotate');
    $(`#todos-albums-${id}`).slideToggle(600, null);
  }
  else if(userBlock.todosVisible) {
    $(`#caret-todos-${id}`).toggleClass('rotate');
    $(`#todos-albums-${id}`).slideToggle(600, () => { fillAlbums(id) });
    $(`#caret-albums-${id}`).toggleClass('rotate');
    $(`#todos-albums-${id}`).slideToggle(600, null);
  }
  else {
    $(`#caret-albums-${id}`).toggleClass('rotate');
    $(`#todos-albums-${id}`).slideToggle(600, null);
  }
  userBlock.todosVisible = false;
}

// Fills the albums into the div
function fillAlbums(id) {
  let userBlock = document.getElementById(`user-block-${id}`);
  $(`#todos-albums-${id}`).empty();
  for(let album of userBlock.loadedAlbums) {
    let albumBlock = document.createElement('p');
    albumBlock.innerHTML = `<i class="fas fa-music"></i>${album.title}`;
    $(`#todos-albums-${id}`).append(albumBlock);
  }
}
