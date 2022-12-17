function submitForm(event) {
  event.preventDefault();

  console.log(event.target);
}

const form = document.querySelector('#form');
const feedback = document.querySelector('#feedback');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  getData(e.target);
});

function getData(form) {
  let formData = new FormData(form);
  let feedback = Object.fromEntries(formData);
  console.log(feedback);
}
