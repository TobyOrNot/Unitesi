const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

// Middleware per parse JSON bodies
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your client's origin
    credentials: true,
  }));

// Configura express-session
app.use(session({
    secret: 'passwordSegreta', // Cambia questo con una stringa segreta sicura
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // In produzione, assicurati che sia true su HTTPS
  }));

// Dati di test per le credenziali
const testUsers = [
    {
        username: 'tobias.paparelli@studio.unibo.it',
        password: 'password1',
        nome: 'Tobias',
        cognome: 'Paparelli',
        ruolo: 'Studente'
    },
    {
        username: 'marco.patella@unibo.it',
        password: 'password2',
        nome: ' Marco',
        cognome: 'Patella',
        ruolo: 'Docente'
    },
];

// Endpoint per il login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Controlla le credenziali rispetto ai dati di test
    const user = testUsers.find(u => u.username === username && u.password === password);

    if (user) {
        const { nome, cognome, username, ruolo } = user;
        req.session.isLoggedIn = true;
        req.session.user = { nome, cognome, username, ruolo };

        res.status(200).send({
            message: 'Login successful',
            user: { nome, cognome, username, ruolo }
        });
    } else {
        res.status(401).send({ message: 'Invalid credentials' });
    }
});



// Endpoint to check if user is authenticated
app.get('/isAuthenticated', (req, res) => {
  if (req.session.user) {
    // User is logged in
    res.status(200).send({ user: req.session.user });
  } else {
    // User is not logged in
    res.status(401).send({ message: 'Not authenticated' });
  }
});


app.listen(3001, () => {
    console.log('Server is running on port 3001');
    });

