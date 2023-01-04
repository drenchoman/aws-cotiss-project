const express = require('express');
const { config } = require('dotenv');
const app = express();
const read = require('./read');
const PORT = 5000;

config();

let feedback = [
  'Amazing company, wow!',
  'Cotiss are excellent, they provide such an amazing service',
  'Best Company Ever!',
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
// Need to connect to DynamoDB and pull real feedback
app.get('/', async (req, res) => {
  let feed = getRandomInt(3);
  feed = feedback[feed];
  const pulledFeedback = await read.getItem();
  console.log(pulledFeedback)

  res.json({ feed });
});

app.get('/health-check', (req, res) => {
  res.json({ message: 'Server up and running' });
});

app.listen(PORT, () => {
  console.log('Server Running on PORT', PORT);
});
