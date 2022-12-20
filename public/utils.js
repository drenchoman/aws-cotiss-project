const form = document.querySelector('form');
const feedback = document.querySelector('#feedback');
const stat = document.querySelector('#status');

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

async function sendData() {
  let fee = feedback.value;
  try {
    await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedback: fee }),
    });
    updateStatus();
    clearFeedback();
  } catch (err) {
    console.log(err);
  }
}

function updateStatus() {
  stat.textContent = 'Feedback Submitted Successfully';
}

function clearFeedback() {
  feedback.value = '';
}
