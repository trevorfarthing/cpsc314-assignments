'use strict';

let howlerPlayers = {};
$(document).ready(function(e) {
  $('.playIcon').each(function() {
    let sound = 'music/' + $(this)[0].id + '.mp3';
    let player = new Howl({ src: [sound]});
    howlerPlayers[$(this)[0].id] = player;
  });
  $('.playIcon').click(function(event) {
    $('.playIcon').not(this).each(function() {
      $(this).removeClass('fa-pause-circle');
      $(this).addClass('fa-play-circle');
      howlerPlayers[$(this)[0].id].stop();
    });
    $(this).toggleClass('fa-play-circle fa-pause-circle');
    if(howlerPlayers[$(this)[0].id].playing())
      howlerPlayers[$(this)[0].id].stop();
    else
      howlerPlayers[$(this)[0].id].play();
  });
});
