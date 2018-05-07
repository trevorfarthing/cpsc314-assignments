'use strict';
let cardID = 1;
// GET request to retrieve initial weather
let places = [['Seattle', 'WA'], ['San Francisco', 'CA'], ['London', 'UK'], ['New York', 'NY']];
for(let place of places) {
  $.ajax({
    url:`https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${place[0]}%2C%20${place[1]}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`,
    type: 'GET',
    dataType: 'json'
  }).done((data) => {
    let condition = data.query.results.channel.item.condition;
    createWeatherCard(condition.code, condition.text, condition.temp, `${place[0]}, ${place[1]}`);
  });
}

$(document).ready(function() {
  $('#weatherButton').click(function() {
    let input = $('#placeInput').val();
    if(input.length === 0) {
      $('#validateLocation').html('Not a valid location');
    } else {
      let requestUrl = `https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${input}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
      if(input.includes(',')) {
        let cityProvince = input.split(',');
        requestUrl = `https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${cityProvince[0]}%2C%20${cityProvince[1]}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
      }
      $.ajax({
        url: requestUrl,
        type: 'GET',
        dataType: 'json'
      }).done((data) => {
        if(data.query.results === null) {
          $('#validateLocation').html('Not a valid location');
        } else {
          $('#validateLocation').html('');
          let condition = data.query.results.channel.item.condition;
          createWeatherCard(condition.code, condition.text, condition.temp, `${input}`);
        }
      }).fail((data) => {
        $('#validateLocation').html('Not a valid location');
      });
    }
  });
});

function createWeatherCard(code, text, temp, location) {
  let weatherCard = document.createElement('div');
  weatherCard.id = 'weather-card-' + cardID;
  weatherCard.classList.add('weatherCard');
  weatherCard.classList.add('fadeIn');
  let city = document.createElement('div');
  city.innerHTML = location;
  city.classList.add('cityHeading');
  weatherCard.append(city);
  let icon = document.createElement('i');
  icon.classList.add('fas');
  icon.classList.add(mapCodeToIcon(Number(code)));
  icon.classList.add('weatherIcon');
  weatherCard.append(icon);
  let weatherText = document.createElement('div');
  weatherText.innerHTML = `${text} ${temp}&deg;F`;
  weatherText.classList.add('weatherText');
  weatherCard.append(weatherText);
  let removeButton = document.createElement('div');
  removeButton.innerHTML = 'Remove';
  removeButton.classList.add('removeButton');
  let currID = cardID;
  removeButton.onclick = function() {
    $('#weather-card-' + currID).remove();
  };
  weatherCard.append(removeButton);
  document.getElementById('weatherContainer').append(weatherCard);
  cardID++;
}

// Maps the weather code (a given integer) to an appropriate icon class
function mapCodeToIcon(code) {
  console.log(code);
  let iconClass = '';
  let sun = [31, 32, 33, 34, 36];
  let rain = [1, 8, 9, 10, 11, 12, 6, 35, 40, 45, 47];
  let cloud = [19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30];
  let lightning = [1, 3, 4, 37, 38, 39];
  let snow = [5, 7, 13, 14, 15, 16, 17, 18, 25, 41, 42, 43, 46];

  if(sun.includes(code)) {
    iconClass = 'fa-sun';
  }
  else if(rain.includes(code)) {
    iconClass = 'fa-tint';
  } else if(cloud.includes(code)) {
    iconClass = 'fa-cloud';
  } else if(lightning.includes(code)) {
    iconClass = 'fa-bolt';
  } else if(snow.includes(code)) {
    iconClass = 'fa-snow';
  } else {
    iconClass = 'fa-cloud';
  }
  return iconClass;
}
