const express = require('express');
const { config } = require('dotenv');
const bodyParser = require('body-parser')
const app = express();
const read = require('./read');
const write = require('./write')
const cors = require('cors')
const PORT = 8080;
const { body, validationResult } = require('express-validator');

const whitelist = ['https://aws-project-client-drenchoman.vercel.app/', 'https://aws-project-client-git-main-drenchoman.vercel.app/', 'https://aws-project-client.vercel.app/', ]


const corsOptions = {
  origin: true, credentials: true
}

app.use(cors(corsOptions))





config();
app.use(bodyParser.json())




// Get all Feedback
app.get('/feedback', async (req, res) => {
 
try {
await read.readAll(res)

}
catch(err) {
  console.log("Ooops there was an error")
}

});

// Get single Feedback
app.get('/feedback/:id/',  async (req, res) => {
  try {
    
    await read.readOne(res, req.params.id, req.params.question )
  }
  catch (err) {
    console.log("Oops there was an error")
  }
})

// Post feedback to table
app.post('/feedback', 
  body('userid').escape().ltrim().trim(),
  body('q1').escape().trim(), 
  body('q2').escape().toInt(), 
  body('q3').escape().trim(), 
  body('dateSubmitted').escape().trim().toInt(), 
  
  async (req, res) => {
    try {
      let feedback = {TableName: 'userFeedback',
      Item: req.body
    }
      await write.writeOne(res, feedback)

    }
    catch (err) {
      console.log("Oops an error occured")
    }
 
})


app.listen(PORT, () => {
  console.log('Server Running on PORT', PORT);
});
