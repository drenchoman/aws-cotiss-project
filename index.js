const express = require('express');
const { config } = require('dotenv');
const bodyParser = require('body-parser')
const app = express();
const read = require('./read');
const write = require('./write')
const cors = require('cors')
const PORT = 5000;

// Remove Localhost when I am done
const whitelist = ['http://localhost:5173', 'https://aws-project-client-drenchoman.vercel.app/', 'https://aws-project-client-git-main-drenchoman.vercel.app/', 'https://aws-project-client.vercel.app/' ]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin){
      callback(null, true)
    } else {
      callback( new Error('Not allowd by CORS'))
    }
  }
}


config();
app.use(bodyParser.json())
app.use(cors(corsOptions))

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

// Get all Feedback
app.get('/feedback', async (req, res) => {
 
try {
await read.readAll(res)

}
catch(err) {
  console.log("test")
  console.log(err)
}

});

// Get single Feedback
app.get('/feedback/:id', async (req, res) => {
  try {
    
    await read.readOne(res, req.params.id )
  }
  catch (err) {
    console.log(err)
  }
})

// Post feedback to table
app.post('/feedback', async (req, res) => {

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
