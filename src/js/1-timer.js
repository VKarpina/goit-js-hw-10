import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('.start-btn');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const dateTimePicker = document.querySelector('#datetime-picker');
let userSelectedDate = null;
let isActive = false;
let intervalId = null;

startBtn.disabled = true;

startBtn.addEventListener('click', start);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate.getTime() <= Date.now()) {
      startBtn.disabled = true;
      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        position: 'topRight',
        backgroundColor: '#ef4040',
        iconUrl: '../img/bi_x-octagon.svg',
      });
    } else {
      startBtn.classList.add('activeBtn');
      startBtn.disabled = false;
    }
    console.log(selectedDates[0]);
  },
};

flatpickr(dateTimePicker, options);

function start() {
  if (isActive) {
    return;
  }
  dateTimePicker.disabled = true;
  startBtn.disabled = true;
  isActive = true;
  startBtn.classList.remove('activeBtn');
  intervalId = setInterval(() => {
    const deltaTime = userSelectedDate - Date.now();
    const ms = convertMs(deltaTime);
    updateTimer(ms);
    if (deltaTime < 1000) {
      clearInterval(intervalId);
      dateTimePicker.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  dataDays.textContent = `${days}`;
  dataHours.textContent = `${hours}`;
  dataMinutes.textContent = `${minutes}`;
  dataSeconds.textContent = `${seconds}`;
}
