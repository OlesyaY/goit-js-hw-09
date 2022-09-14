const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stoptBtn = document.querySelector('button[data-stop]');

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const handleChangeBgColor = () => {
  body.style.backgroundColor = getRandomHexColor();
};

const handleStart = () => {
  startBtn.setAttribute('disabled', true);

  handleChangeBgColor();
  timerId = setInterval(handleChangeBgColor, 1000);
};

const handleStop = () => {
  startBtn.removeAttribute('disabled');
  clearInterval(timerId);
};

startBtn.addEventListener('click', handleStart);
stoptBtn.addEventListener('click', handleStop);
