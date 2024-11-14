import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handelSubmit);

function handelSubmit(event) {
  event.preventDefault();

  let delay = form.elements.delay.value;
  const radioCheck = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioCheck === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(value => {
      iziToast.success({ message: `✅ Fulfilled promise in ${value}ms` });
    })
    .catch(error => {
      iziToast.error({ message: `❌ Rejected promise in ${error}ms` });
    })
    .finally(() => {
      form.reset();
    });
}
