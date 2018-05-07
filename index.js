'use strict';

$(document).ready(function() {
  $('#ytHomeCard').mouseover(function() {
    $('#homeOuterBlock').css('background', 'black url("assets/guitar2.jpg") no-repeat center');
    $('#homeOuterBlock').css('background-size', 'cover');
  });

  $('#scHomeCard').mouseover(function() {
    $('#homeOuterBlock').css('background', 'black url("assets/nerves.jpg") no-repeat center');
    $('#homeOuterBlock').css('background-size', 'cover');
  });

  $('#bcHomeCard').mouseover(function() {
    $('#homeOuterBlock').css('background', 'black url("assets/struckred.jpg") no-repeat center');
    $('#homeOuterBlock').css('background-size', 'cover');
  });

  $('.homeCard').mouseleave(function() {
    $('#homeOuterBlock').css('background', 'black url("assets/arizona.jpg") no-repeat center');
    $('#homeOuterBlock').css('background-size', 'cover');
  });
});
