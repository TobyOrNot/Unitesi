const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PropostaTesi = require('./models/propostaTesi.module')

// Middleware per parse JSON bodies
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000', 
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
        console.log(req.body);
        const propostaTesi = new PropostaTesi({
            titolo: req.body.titolo,
            descrizione: req.body.descrizione,
            docente: req.body.docente
          });
        const result = await propostaTesi.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

app.get('/api/proposteTesi/:cognome', async (req, res) => {
    try {
        console.log(req.params.cognome);
        const proposteTesi = await PropostaTesi.find({ docente: req.params.cognome });
        res.status(200).json(proposteTesi);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

app.get('/api/proposteTesiAll', async (req, res) => {
    try {
        const proposteTesi = await PropostaTesi.find();
        res.status(200).json(proposteTesi);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});



app.listen(3002, () => {
    console.log('Server is running on port 3002');
    });

