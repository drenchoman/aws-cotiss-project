const form = document.querySelector('form');
const feedback = document.querySelector('#feedback');

function submitForm(event) {
  event.preventDefault();
  getData(event.target);
  console.log(event.target);
}

function getData(form) {
  let formData = new FormData(form);
  let feedback = Object.fromEntries(formData);
  console.log(feedback);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  sendData();
});

function sendData() {
  let fee = feedback.value;
  console.log(fee);
  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ feedback: fee }),
  });
}
