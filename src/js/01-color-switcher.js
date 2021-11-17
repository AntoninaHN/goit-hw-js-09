function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  timer: null,
  box: document.createElement('div'),
};
refs.box.className = 'boxElement';
refs.start.before(refs.box);
refs.box.prepend(refs.start, refs.stop);
refs.stop.setAttribute('disabled', '');

refs.start.addEventListener('click', disableStart);
refs.stop.addEventListener('click', disableStop);

function disableStart(e) {
  e.target.setAttribute('disabled', '');
  refs.stop.removeAttribute('disabled');
  //seting the color immediately for the first time
  refs.timer = refs.body.style.backgroundColor = getRandomHexColor();
  //color changes every second
  refs.timer = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  //console.log('start');
}

function disableStop(e) {
  e.target.setAttribute('disabled', '');
  refs.start.removeAttribute('disabled');
  clearInterval(refs.timer);
  //console.log('stop');
}
