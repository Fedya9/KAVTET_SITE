const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/submit-email', async (req, res) => {
    const email = req.body.email?.trim();
    
    if (!email) {
        console.log('No email provided');
        return res.status(400).json({ 
            success: false, 
            message: 'Email is required' 
        });
    }

    try {
        console.log('Received email:', email);
        await fs.appendFile(path.join(__dirname, 'emails.txt'), email + '\n');
        console.log('Email saved to emails.txt');
        res.json({ success: true });
    } catch (err) {
        console.error('Error saving email:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Server error while saving email' 
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});