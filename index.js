const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Post feedback to DynamoDB on post
app.post('/', (req, res) => {
  console.log(req.body);
  const feedback = req.body;
  feedback.id = 2;
  console.log(feedback);
});

app.listen(3000, () => console.log('App running on port 3000'));
