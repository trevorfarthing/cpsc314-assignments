'use strict';

$(document).on('submit', function(event) {
  event.preventDefault();
  let name = document.forms.questionsForm.name.value;
  let email = document.forms.questionsForm.email.value;
  let message = document.forms.questionsForm.message.value;
  let validateSuccess = true;
  // Validate name field
  if(name.length === 0) {
    $('#nameValidate').html('Please enter your name');
    validateSuccess = false;
  } else {
    $('#nameValidate').html('');
  }
  // Validate email field
  var re = /\S+@\S+\.\S+/;
  if(email.length === 0) {
    $('#emailValidate').html('Please enter your email');
    validateSuccess = false;
  }
  else if(!re.test(email)) {
    $('#emailValidate').html('Please enter a valid email');
    validateSuccess = false;
  }
  else {
    $('#emailValidate').html('');
  }
  // Validate message field
  if(message.length === 0) {
    $('#msgValidate').html('Please enter a message');
    validateSuccess = false;
  }
  else {
    $('#msgValidate').html('');
  }
  // Otherwise clear out fields and display content submitted
  if(validateSuccess) {
    $('#formDisplay').html(`Name: ${name}, Email: ${email}, Message: ${message}`);
    document.forms.questionsForm.name.value = '';
    document.forms.questionsForm.email.value = '';
    document.forms.questionsForm.message.value = '';
  }
  return validateSuccess;
});
