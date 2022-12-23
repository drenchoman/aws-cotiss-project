const express = require('express');

const app = express();

const PORT = 5000;

let feedback = [
  'Amazing company, wow!',
  'Cotiss are excellent, they provide such an amazing service',
  'Best Company Ever!',
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
// Need to connect to DynamoDB and pull real feedback
app.get('/', (req, res) => {
  let feed = getRandomInt(3);
  feed = feedback[feed];
  res.json({ feed });
});

app.get('/health-check', (req, res) => {
  res.json({ message: 'Server up and running' });
});

app.listen(PORT, () => {
  console.log('Server Running on PORT', PORT);
});
