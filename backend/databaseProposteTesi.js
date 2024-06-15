const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Middleware per parse JSON bodies
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3002', 
    credentials: true,
  }));


mongoose.connect('mongodb+srv://tobiaspaparelli:Toby2002.@backenddb.6xgwp3z.mongodb.net/ProposteTesi?retryWrites=true&w=majority&appName=BackendDB')
.then(() => {
    console.log('Connected to database');
})
.catch(() => {
    console.log('Connection failed');
});


app.post('/api/proposteTesi', async (req, res) => {
    try {
        const propostaTesi = await PropostaTesi.create(req.body);
        res.status(200).json(propostaTesi);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});



app.listen(3002, () => {
    console.log('Server is running on port 3002');
    });

