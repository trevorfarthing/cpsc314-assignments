// Using resources from https://roundsliderui.com/ and https://howlerjs.com/
'use strict';

let howlerPlayers = {};
$(document).ready(function(e) {

  // Create Howl player for each song
  $('.playIcon').each(function() {
    let sound = 'music/' + $(this)[0].id + '.mp3';
    let icon = $(this);
    let player = new Howl({
      src: [sound],
      onend: function() {
        icon.toggleClass('fa-play fa-pause');
      },
      onload: function() {
        $(icon.siblings('.circleSlider')[0]).roundSlider('option', 'max', howlerPlayers[icon[0].id].duration());
      }
    });
    howlerPlayers[$(this)[0].id] = player;
  });

  let timer = null;
  // On play, change the icon from play to pause and stop all other players
  $('.playIcon').click(function(event) {
    let icon = $(this);
    $('.playIcon').not(this).each(function() {
      $(this).removeClass('fa-pause');
      $(this).addClass('fa-play');
      howlerPlayers[$(this)[0].id].pause();
    });
    $(this).toggleClass('fa-play fa-pause');

    // If playing, pause it
    if(howlerPlayers[$(this)[0].id].playing()) {
      if(timer !== null)
        clearInterval(timer);
      howlerPlayers[$(this)[0].id].pause();
    }
    // If paused, seek to the position of the slider and play. Update value of slider every 100ms
    else {
      let playbackPosition = $(icon.siblings('.circleSlider')[0]).roundSlider('option', 'value');
      howlerPlayers[icon[0].id].seek(playbackPosition);
      timer = setInterval(function() {
        $(icon.siblings('.circleSlider')[0]).roundSlider('option', 'value', howlerPlayers[icon[0].id].seek());
      }, 100);
      howlerPlayers[icon[0].id].play();
    }
  });

  // Create each circle slider
  $(".circleSlider").roundSlider({
    sliderType: "min-range",
    handleShape: "round",
    width: 15,
    radius: 75,
    value: 0,
    showTooltip: false,
    svgMode: true,
    borderWidth: 0,
    pathColor: 'rgba(0, 0, 0, 0.5)',
    rangeColor: 'rgba(255, 255, 255, 0.3)',
    min: 0,
    step: 0.1
  });

  // Seek on user events (drag or click on the slider)
  $(".circleSlider").on("change", function(e) {
    let icon = $(this).siblings('.playIcon');
    howlerPlayers[icon[0].id].seek(e.value);
  });
  $(".circleSlider").on("start", function(e) {
    if(timer !== null)
      clearInterval(timer);
  });
  $(".circleSlider").on("stop", function(e) {
    let circleSlider = $(this);
    let icon = $(this).siblings('.playIcon');
    howlerPlayers[icon[0].id].seek(e.value);
    if(howlerPlayers[icon[0].id].playing()) {
      timer = setInterval(function() {
        circleSlider.roundSlider('option', 'value', howlerPlayers[icon[0].id].seek());
      }, 100);
    }
  });

  // Fixes issue with circle slider when scaling the song box on hover
  $(".songBox").hover(
    function(event) {
      let playButton = $(this).find(".playButton");
      playButton.css("opacity", "1");
      $(this).css("transform", "scale(1.1)");
      playButton.css("transform", "scale(0.9)");

  }, function(event) {
    $(this).css("transform", "scale(1)");
    let playButton = $(this).find(".playButton");
    playButton.css("opacity", "0");
    playButton.css("transform", "scale(1)");
  });
});
