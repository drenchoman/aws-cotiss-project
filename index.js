const express = require('express');
const { config } = require('dotenv');
const bodyParser = require('body-parser')
const app = express();
const read = require('./read');
const write = require('./write')
const PORT = 5000;

config();
app.use(bodyParser.json())

let testData = {
  TableName: 'userFeedback',
  Item: {
    'userid': '23456-abcd-65432',
    'q1': 'It helps make my job a whole lot easier',
    'q2': 7,
    'q3': 'Nothing, apps great',
    'dateSubmitted': Date.now()
  }
}

app.get('/', async (req, res) => {
 
try {
await read.readAll(res)

}
catch(err) {
  console.log("test")
  console.log(err)
}

});


app.get('/allfeedback', async (req, res) => {
  try {
    await read.readOne(res)
  }
  catch (err) {
    console.log(err)
  }
})

app.post('/test', async (req, res) => {

  res.json(req.body)
})


app.post('/', async (req, res) => {
  try {
    await write.writeOne(res, testData)
  }
  catch(err) {
    console.log(err)
  }
})



app.listen(PORT, () => {
  console.log('Server Running on PORT', PORT);
});
