import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  box: document.createElement('div'),
  p: document.querySelector('p'),
  inputDateTimePicker: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer'),
  selectedDate: 0,
  dateNowGlobal: 0,
  timerId: document.querySelector('#datetime-picker'),
  daysValue: document.querySelector('span.value[data-days]'),
  hoursValue: document.querySelector('span.value[data-hours]'),
  minutesValue: document.querySelector('span.value[data-minutes]'),
  secondsValue: document.querySelector('span.value[data-seconds]'),
};

// function colorationButton() {
//   if (refs.btnStart.disabled === true) {
//     return (refs.btnStart.style.background = 'grey');
//   }
// }

refs.p.after(refs.box);
refs.box.prepend(refs.inputDateTimePicker, refs.btnStart);
refs.box.after(refs.timer);
refs.btnStart.setAttribute('disabled', '');

function convertToMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  if (value < 10) {
    return `${value}`.padStart(2, '0');
  } else {
    return `${value}`;
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateNow = new Date();
    refs.selectedDate = selectedDates[0].getTime();
    console.log(selectedDates[0]);

    if (selectedDates[0].getTime() >= dateNow.getTime()) {
      refs.btnStart.removeAttribute('disabled');
    } else {
      refs.btnStart.setAttribute('disabled', '');
      Notify.failure('Please choose a date in the future', {
        clickToClose: true,
        position: 'center-center',
      });
    }
  },
};

flatpickr(refs.inputDateTimePicker, options);

refs.btnStart.addEventListener('click', onStart);

function onStart(e) {
  refs.btnStart.setAttribute('disabled', '');
  refs.inputDateTimePicker.setAttribute('disabled', '');
  refs.timerId = setInterval(timerRun, 1000);
}

function timerRun(e) {
  refs.dateNowGlobal = new Date();

  let deltaTimeMs = refs.selectedDate - refs.dateNowGlobal;
  //console.log(deltaTimeMs);
  let deltaTimeMsObj = convertToMs(deltaTimeMs);

  const { days, hours, minutes, seconds } = deltaTimeMsObj;

  refs.daysValue.textContent = addLeadingZero(days);
  refs.hoursValue.textContent = addLeadingZero(hours);
  refs.minutesValue.textContent = addLeadingZero(minutes);
  refs.secondsValue.textContent = addLeadingZero(seconds);

  if (deltaTimeMs < 1000) {
    Notify.success('Timer is Over!', {
      clickToClose: true,
      position: 'center-center',
    });
    clearInterval(refs.timerId);
  }
}

// //OLEG S.
// //Описан в документации
// import flatpickr from 'flatpickr';
// // Дополнительный импорт стилей
// import 'flatpickr/dist/flatpickr.min.css';
// const startBtn = document.querySelector('button[data-start]');
// startBtn.setAttribute('disabled', 'disabled');

// let inputEl = document.querySelector('#datetime-picker');
// const dataTimePicker = document.querySelector('#datetime-picker');
// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//     if (selectedDates[0] < new Date()) {
//       window.alert('Please choose a date in the future');
//       startBtn.setAttribute('disabled', 'disabled');
//     } else {
//       startBtn.removeAttribute('disabled', '');

//       startBtn.addEventListener('click', onStart);
//       //inputEl = setInterval(b, 1000);

//       function onStart(e) {
// startBtn.setAttribute('disabled', '');
// dataTimePicker.setAttribute('disabled', '');
// // time.setAttribute('disabled', '');
// inputEl = setInterval(b, 1000);
//       }
//     }
//     function b() {
// let deltaTimeMs = selectedDates[0] - new Date();

// console.log(deltaTimeMs);
// let deltaTimeMsObj = convertMs(deltaTimeMs);

//       const { days, hours, minutes, seconds } = convertMs(deltaTimeMs);
//       document.querySelector('span[data-days]').textContent = days;
//       document.querySelector('span[data-hours]').textContent = hours;
//       document.querySelector('span[data-minutes]').textContent = minutes;
//       document.querySelector('span[data-seconds]').textContent = seconds;

//       if (deltaTimeMs < 1000) {
//         console.log('Timer is Over!');
//         {
//         }
//         clearInterval(inputEl);
//       }
//     }
//   },
// };

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// // console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// // console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// // console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// flatpickr('input#datetime-picker', options);

// // Описан в документации
// import flatpickr from 'flatpickr';
// // Дополнительный импорт стилей
// import 'flatpickr/dist/flatpickr.min.css';
// const startBtn = document.querySelector('button[data-start]');
// startBtn.setAttribute('disabled', 'disabled');

// let inputEl = document.querySelector('#datetime-picker');
// const dataTimePicker = document.querySelector('#datetime-picker');

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//     if (selectedDates[0] < new Date()) {
//       window.alert('Please choose a date in the future');
//       startBtn.setAttribute('disabled', 'disabled');
//     } else {
//       startBtn.removeAttribute('disabled', '');

//       startBtn.addEventListener('click', () => {
//         startBtn.setAttribute('disabled', '');
//         dataTimePicker.setAttribute('disabled', '');
//         inputEl = setInterval(b, 1000);
//       });
//       function b() {
// let deltaTimeMs = selectedDates[0] - new Date();
// let deltaTimeMsObj = convertMs(deltaTimeMs);

// const { days, hours, minutes, seconds } = convertMs(deltaTimeMs);
//         document.querySelector('span[data-days]').textContent = days;
//         document.querySelector('span[data-hours]').textContent = hours;
//         document.querySelector('span[data-minutes]').textContent = minutes;
//         document.querySelector('span[data-seconds]').textContent = seconds;

//         if (deltaTimeMs < 1000) {
//           console.log('Timer is Over!');
//           {
//           }
//           clearInterval(inputEl);
//         }
//       }
//     }
//   },
// };

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// // console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// // console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// // console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

//  flatpickr('input#datetime-picker', options);
