import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formBlock = document.querySelector('.form');

formBlock.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget;
  let currentDelay = Number(delay.value);
  const stepNumber = Number(step.value);
  const amountP = Number(amount.value);

  for (let position = 1; position <= amountP; position++) {
    createPromise(position, currentDelay);

    console.log('delayPromise', currentDelay, 'position', position);
    currentDelay += stepNumber;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
