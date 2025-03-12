const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));  // Serve your static files

// Endpoint to handle email submission
app.post('/submit-email', (req, res) => {
  console.log(req.body); // Log the incoming data
  const email = req.body.email;
  if (email) {
    fs.appendFile(path.join(__dirname, 'emails.txt'), email + '\n', (err) => {
      if (err) {
        console.error('Error saving email:', err);
        return res.json({ success: false });
      }
      res.json({ success: true });
    });
  } else {
    res.json({ success: false });
  }
});
const cors = require('cors');
app.use(cors()); // Enable CORS for all routes
