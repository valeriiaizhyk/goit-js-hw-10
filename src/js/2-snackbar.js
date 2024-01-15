import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDelay = document.querySelector('input[name="delay"]');
const form = document.querySelector('.form');

form.addEventListener('submit', onGeneratePromise);

function onGeneratePromise(event) {
  event.preventDefault();

  const delay = parseInt(form.delay.value, 10);
  const userChoice = form.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userChoice === 'fulfilled') {
        resolve(delay);
      } else if (userChoice === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  promise.then(delay =>
    iziToast.success({
      message: `✅ Fulfilled promise in ${delay}ms`,
      position: 'topRight',
    })
  );
  promise.catch(delay =>
    iziToast.error({
      message: `❌ Rejected promise in ${delay}ms`,
      position: 'topRight',
    })
  );

  inputDelay.value = '';
}
