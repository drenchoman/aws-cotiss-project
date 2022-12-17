const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  console.log(req.body);
});

app.listen(3000, () => console.log('App running on port 3000'));
