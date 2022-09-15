import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');

const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

startBtn.setAttribute('disabled', true);

let selectedDate = 0;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = new Date(selectedDates[0]).getTime();
    if (selectedDate < new Date().getTime()) {
      startBtn.setAttribute('disabled', true);

      Notify.failure('Please choose a date in the future');

      return;
    }

    startBtn.removeAttribute('disabled');
  },
};

const setDate = ms => {
  const time = convertMs(ms);
  days.innerHTML = addLeadingZero(time.days);
  hours.innerHTML = addLeadingZero(time.hours);
  minutes.innerHTML = addLeadingZero(time.minutes);
  seconds.innerHTML = addLeadingZero(time.seconds);
};

const addLeadingZero = value => {
  const str = `${value}`;
  return str.length === 2 ? str : str.padStart(2, '0');
};

const handleStart = () => {
  setDate(selectedDate - new Date().getTime());
  const countInterval = setInterval(() => {
    if (selectedDate <= new Date().getTime()) {
      clearInterval(countInterval);
      startBtn.setAttribute('disabled', true);

      return;
    }

    setDate(selectedDate - new Date().getTime());
  }, 1000);
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', handleStart);
