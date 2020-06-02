let typewriterOptions = [
  'I like to create.',
  'I like to code.',
  'I like to produce.',
  'I like to brainstorm.',
  'I like to collaborate.'
];
let currOption = '';
let period = 2000;
let loopNum = 0;
let typewriterText = '';
let isDeleting = false;


function tick(element) {
  var i = loopNum % typewriterOptions.length;
  var fullTxt = typewriterOptions[i];

  if (isDeleting) {
    typewriterText = fullTxt.substring(0, typewriterText.length - 1);
  } else {
    typewriterText = fullTxt.substring(0, typewriterText.length + 1);
  }

  element.innerHTML = '<span class="wrap">'+typewriterText+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (isDeleting) { delta /= 2; }

  if (!isDeleting && typewriterText === fullTxt) {
    delta = period;
    isDeleting = true;
  } else if (isDeleting && typewriterText === 'I like to') {
    isDeleting = false;
    loopNum++;
    delta = 1000;
  }

  setTimeout(function() {
    that.tick(element);
  }, delta);
}

function startTypewriter() {
    var typewriterEl = document.querySelector('.typewrite');
    tick(typewriterEl);

    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = `.typewrite > .wrap {
                        border-right: 0.08em solid lightgray;
                        animation: blink 0.75s step-end infinite;
                        -webkit-animation: blink 0.75s step-end infinite;
                        -moz-animation: blink 0.75s step-end infinite;
                        -o-animation: blink 0.75s step-end infinite;
                      }
                      @keyframes blink { 50% {border-right: 0.08em solid transparent}}
                      @-webkit-keyframes blink { 50% {border-right: 0.08em solid transparent}}
                      @-moz-keyframes blink { 50% {border-right: 0.08em solid transparent}}
                      @-o-keyframes blink { 50% {border-right: 0.08em solid transparent}}`;
    document.body.appendChild(css);
}
