import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');

const btnStart = document.querySelector('button[data-start]');
btnStart.disabled = true;

const daysTimer = document.querySelector('span[data-days]');
const hoursTimer = document.querySelector('span[data-hours]');
const minsTimer = document.querySelector('span[data-minutes]');
const secsTimer = document.querySelector('span[data-seconds]');

let userSelectedDate = null;
let timer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate > selectedDates[0]) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
      userSelectedDate = selectedDates[0];
      resetTimer();
    }
  },
};

const datePicker = flatpickr(input, options);

input.addEventListener('change', () => {
  btnStart.disabled = true;
  resetTimer();
});

input.addEventListener('focus', () => {
  if (!timer) {
    datePicker.config.defaultDate = new Date();
    resetTimer();
  }
});

btnStart.addEventListener('click', startCountdown);

function startCountdown() {
  timer = setInterval(() => {
    const selectedDateTime = userSelectedDate.getTime();
    const currentDateTime = new Date().getTime();
    const different = selectedDateTime - currentDateTime;
    const result = convertMs(different);

    const { days, hours, minutes, seconds } = result;
    daysTimer.textContent = addLeadingZero(days);
    hoursTimer.textContent = addLeadingZero(hours);
    minsTimer.textContent = addLeadingZero(minutes);
    secsTimer.textContent = addLeadingZero(seconds);

    if (different < 0) {
      clearInterval(timer);
      resetTimer();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  daysTimer.textContent = '00';
  hoursTimer.textContent = '00';
  minsTimer.textContent = '00';
  secsTimer.textContent = '00';
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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
