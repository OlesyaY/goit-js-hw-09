import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    return new Promise(resolve => {
      setTimeout(() => resolve({ position, delay }), delay);
    });
  } else {
    // Reject
    return new Promise((_, reject) => {
      setTimeout(() => reject({ position, delay }), delay);
    });
  }
}

const handleSubmitForm = event => {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  console.log(delay.value, step.value, amount.value);

  let delayValue = Number.parseInt(delay.value);

  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delayValue += Number.parseInt(step.value);
  }
};

form.addEventListener('submit', handleSubmitForm);
