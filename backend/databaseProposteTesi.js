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


mongoose.connect('mongodb+srv://unitesi2024:unitesi@unitesi.zbuyhqs.mongodb.net/?retryWrites=true&w=majority&appName=Unitesi')
.then(() => {
    console.log('Connected to database');
})
.catch(() => {
    console.log('Connection failed');
});


/* CREARE NUOVA PAGINA */ 

app.post('/api/addPage', async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        // Crea una nuova pagina Unitesi
        const paginaUnitesi = new PaginaUnitesi({
            titolo: req.body.titolo,
            descrizione: req.body.descrizione,
            relatoreEmail: req.body.relatoreEmail, 
            studenteEmail: req.body.studenteEmail,
            correlatoriEmail: [], 
            dataCreazione: new Date(),
            checkpoints: []  
        });
        const result = await paginaUnitesi.save();
        console.log(paginaUnitesi);

        res.status(201).json(result);
    } catch (error) {
        console.error("Error saving page:", error);
        res.status(500).json({ error: error.message });
    }
});

/* OTTENERE PAGINA UNITESI CON UNO SPECIFICO ID */

app.get('/api/paginaunitesi/:pageId', async (req, res) => {
  
  try {
      const paginaUnitesi = await PaginaUnitesi.findById(req.params.pageId).populate('checkpoints');
      console.log(paginaUnitesi.checkpoints);
      if (!paginaUnitesi) {
          return res.status(404).json({ message: 'PaginaUnitesi not found' });
      }
      res.status(200).json(paginaUnitesi);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

/* OTTENERE PAGINE UNITESI DI UN RELATORE */

app.get('/api/pagineunitesi/relatore/:relatoreEmail', async (req, res) => {
        
  const { relatoreEmail } = req.params;

  try {
      // Cerca una pagina unitesi con lo studenteEmail specificato
      const pagineUnitesi = await PaginaUnitesi.find({ relatoreEmail });
      console.log(pagineUnitesi);
      if (!pagineUnitesi) {
          return res.status(404).json({ error: 'Pagina unitesi non trovata' });
      }

      res.status(200).json(pagineUnitesi);
  } catch (error) {
      console.error('Errore durante la ricerca della pagina unitesi:', error);
      res.status(500).json({ error: 'Errore interno del server' });
  }

});

/* OTTENERE PAGINE UNITESI DI UN CORRELATORE */

app.get('/api/pagineunitesi/correlatore/:correlatoriEmail', async (req, res) => {
    
  const { correlatoriEmail } = req.params;

  console.log(correlatoriEmail);

  try {
      // Cerca una pagina unitesi con lo studenteEmail specificato
      const pagineUnitesi = await PaginaUnitesi.find({ correlatoriEmail });

      console.log(pagineUnitesi);

      if (!pagineUnitesi) {
          return res.status(404).json({ error: 'Pagina unitesi non trovata' });
      }

      res.status(200).json(pagineUnitesi);
  } catch (error) {
      console.error('Errore durante la ricerca della pagina unitesi:', error);
      res.status(500).json({ error: 'Errore interno del server' });
  }

});

/* OTTENERE PAGINA UNITESI DI UNO STUDENTE */

app.get('/api/paginaunitesi/studente/:studenteEmail', async (req, res) => {
      
  const { studenteEmail } = req.params;

  console.log(studenteEmail);

  try {
      // Cerca una pagina unitesi con lo studenteEmail specificato
      const paginaUnitesi = await PaginaUnitesi.findOne({ studenteEmail });

      if (!paginaUnitesi) {
          return res.status(404).json({ error: 'Pagina unitesi non trovata' });
      }

      console.log(paginaUnitesi);

      res.status(200).json({ paginaUnitesiId: paginaUnitesi._id });
  } catch (error) {
      console.error('Errore durante la ricerca della pagina unitesi:', error);
      res.status(500).json({ error: 'Errore interno del server' });
  }
  
});

/* AGGIUNGERE CORRELATORE */ 

app.post('/api/paginaunitesi/:pageId/addCorrelator', async (req, res) => {
    
    try {
      const paginaUnitesi = await PaginaUnitesi.findById(req.params.pageId);
      const correlatore = req.body.email;

      paginaUnitesi.correlatoriEmail.push(correlatore);
      await paginaUnitesi.save();

      console.log(paginaUnitesi);
      res.status(200).json(paginaUnitesi.correlatoriEmail);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* RIMUOVERE CORRELATORE*/

app.delete('/api/paginaunitesi/:pageId/removeCorrelator/:name', async (req, res) => {
  const { pageId , name } = req.params;

  try {
    const paginaUnitesi = await PaginaUnitesi.findById(pageId);

    if (!paginaUnitesi) {
      return res.status(404).json({ error: 'PaginaUnitesi not found' });
    }

    const correlatoreIndex = paginaUnitesi.correlatoriEmail.findIndex(correlatore => correlatore === name);
      if (correlatoreIndex === -1) {
          return res.status(404).json({ error: 'Document not found in checkpoint' });
      }

      // Rimuovi il documento dall'array documenti
      paginaUnitesi.correlatoriEmail.splice(correlatoreIndex, 1);

      // Salva il checkpoint aggiornato
      await paginaUnitesi.save();

    res.status(200).json({ correlators: paginaUnitesi.correlatoriEmail });
  } catch (error) {
    console.error('Error removing correlator:', error);
    res.status(500).json({ error: 'Failed to remove correlator' });
  }
});

/* AGGIUNGERE UN CHECKPOINT */

app.post('/api/paginaunitesi/:pageId/addCheckpoint', async (req, res) => {
    const pageId = req.params.pageId;
    console.log(pageId);
    console.log(req.body);
    try {
        const newCheckpoint = new Checkpoint({
            index: req.body.index,
            radius: 50,
            titolo: req.body.titolo,
            descrizione: req.body.descrizione,
            dataScadenza: req.body.dataScadenza,
            commenti: [],
            documenti: [],
            validato: false,
        });
        await newCheckpoint.save();
        console.log(newCheckpoint);
        const paginaUnitesi = await PaginaUnitesi.findByIdAndUpdate(
            pageId,
            { $push: { checkpoints: newCheckpoint._id } },
            { new: true }
        ).populate('checkpoints');

        console.log(paginaUnitesi);

        res.status(201).json(paginaUnitesi);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* MODIFICARE UN CHECKPOINT */

app.put('/api/paginaunitesi/:pageId/editCheckpoint/:checkpointId', async (req, res) => {
    const { pageId, checkpointId } = req.params;
    console.log(pageId);
    console.log(checkpointId);
    try {
        const checkpoint = await Checkpoint.findById(checkpointId);

        console.log(checkpoint);

        if (!checkpoint) {
            return res.status(404).json({ message: 'Checkpoint not found' });
        }

        checkpoint.titolo = req.body.titolo || checkpoint.titolo;
        checkpoint.descrizione = req.body.descrizione || checkpoint.descrizione;
        checkpoint.dataScadenza = req.body.dataScadenza || checkpoint.dataScadenza;
        checkpoint.commenti = req.body.commenti || checkpoint.commenti;
        checkpoint.documenti = req.body.documenti || checkpoint.documenti;
        checkpoint.validato = req.body.validato || checkpoint.validato;

        await checkpoint.save();

        console.log(checkpoint);

        const paginaUnitesi = await PaginaUnitesi.findById(pageId).populate('checkpoints');
        res.status(200).json(paginaUnitesi);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

/* RIMUOVERE UN CHECKPOINT */

app.delete('/api/paginaunitesi/:pageId/removeCheckpoint/:checkpointId', async (req, res) => {
    
    const pageId = req.params.pageId;
    const checkpointId = req.params.checkpointId;

    try {
        // Rimuovi il checkpoint dalla roadmap
        const paginaUnitesi = await PaginaUnitesi.findByIdAndUpdate(
            pageId,
            { $pull: { checkpoints: checkpointId } },
            { new: true }
        ).populate('checkpoints');

        // Elimina il checkpoint dal database
        await Checkpoint.findByIdAndDelete(checkpointId);

        res.status(200).json(paginaUnitesi);
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove checkpoint' });
    }
});

/* OTTENERE COMMENTI DI UN CHECKPOINT */

app.get('/api/paginaunitesi/:pageId/checkpoint/:checkpointId/comments', async (req, res) => {

  try {
      const checkpoint = await Checkpoint.findById(req.params.checkpointId).populate('commenti');
      console.log(checkpoint.commenti);

      if (!checkpoint) {
          return res.status(404).json({ message: 'Checkpoint not found' });
      }
      res.status(200).json(checkpoint.commenti);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

/* AGGIUNGERE COMMENTO A UN CHECKPOINT */

app.post('/api/paginaunitesi/:pageId/checkpoint/:checkpointId/addComment', async (req, res) => {
  try {
      const { contenuto, autore, data} = req.body;
      console.log(contenuto, autore, data);
      
      const newComment = new Comment({ contenuto, autore, data });

      console.log(newComment);
      const savedComment = await newComment.save();

      const checkpoint = await Checkpoint.findById(req.params.checkpointId);
      checkpoint.commenti.push(savedComment);
      await checkpoint.save();

      console.log(checkpoint);

      res.status(201).json(checkpoint);
  } catch (error) {
      res.status(400).json({ error: 'Failed to add comment' });
  }
});

/* MODIFICARE COMMENTO DI UN CHECKPOINT */

app.put('/api/paginaunitesi/:pageId/checkpoint/:checkpointId/editComment/:commentId', async (req, res) => {
  try {
      const { contenuto } = req.body;
      const comment = await Comment.findByIdAndUpdate(req.params.commentId, { contenuto }, { new: true });

      if (!comment) {
          return res.status(404).json({ error: 'Comment not found' });
      }

      res.status(200).json(comment);
  } catch (error) {
      res.status(400).json({ error: 'Failed to edit comment' });
  }
});

/* RIMUOVERE COMMENTO DI UN CHECKPOINT */

app.delete('/api/roadmap/:pageId/checkpoint/:checkpointId/removeComment/:commentId', async (req, res) => {
  try {
      const checkpoint = await Checkpoint.findById(req.params.checkpointId);
      checkpoint.commenti.pull(req.params.commentId);
      await checkpoint.save();

      await Comment.findByIdAndDelete(req.params.commentId);

      res.status(200).json(checkpoint);
  } catch (error) {
      res.status(400).json({ error: 'Failed to remove comment' });
  }
});

/* AGGIUNGERE DOCUMENTO A UN CHECKPOINT */

app.post('/api/paginaunitesi/:pageId/checkpoint/:checkpointId/addDocument', async (req, res) => {
  try {
    const checkpoint = await Checkpoint.findById(req.params.checkpointId);
    const documentName = req.body.nome;

    checkpoint.documenti.push(documentName);
    await checkpoint.save();

    res.status(201).json(checkpoint);
  } catch (error) {
    console.error('Error adding document:', error);
    res.status(400).json({ error: 'Failed to add document' });
  }
});

/* RIMUOVERE DOCUMENTO DA UN CHECKPOINT */

app.delete('/api/roadmap/:pageId/checkpoint/:checkpointId/removeDocument/:filename', async (req, res) => {
  const { checkpointId, filename } = req.params;

  try {
      const checkpoint = await Checkpoint.findById(checkpointId);
      if (!checkpoint) {
          return res.status(404).json({ error: 'Checkpoint not found' });
      }

      // Trova l'indice del documento con il nome del file specificato nell'array documenti
      const documentIndex = checkpoint.documenti.findIndex(doc => doc === filename);
      if (documentIndex === -1) {
          return res.status(404).json({ error: 'Document not found in checkpoint' });
      }

      // Rimuovi il documento dall'array documenti
      checkpoint.documenti.splice(documentIndex, 1);

      // Salva il checkpoint aggiornato
      await checkpoint.save();

      res.status(200).json(checkpoint);
  } catch (error) {
      console.error('Error removing document:', error);
      res.status(500).json({ error: 'Failed to remove document' });
  }
});

/* VALIDARE UN CHECKPOINT */

app.put('/api/roadmap/:pageId/checkpoint/:checkpointId/validate', async (req, res) => {
  try {
    const checkpoint = await Checkpoint.findById(req.params.checkpointId);
    checkpoint.validato = true;
    await checkpoint.save();
    res.status(200).json(checkpoint);
  } catch (error) {
    res.status(400).json({ error: 'Failed to validate checkpoint' });
  }
});

/* INVALIDARE UN CHECKPOINT */

app.put('/api/roadmap/:pageId/checkpoint/:checkpointId/invalidate', async (req, res) => {
  try {
    const checkpoint = await Checkpoint.findById(req.params.checkpointId);
    checkpoint.validato = false;
    await checkpoint.save();
    res.status(200).json(checkpoint);
  } catch (error) {
    res.status(400).json({ error: 'Failed to invalidate checkpoint' });
  }
});

/* OTTENERE PROPOSTE TESI */ 

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

/* OTTENERE PROPOSTE TESI PER DOCENTE */ 

app.get('/api/proposteTesi/:cognome', async (req, res) => {
  try {
      console.log(req.params.cognome);
      const proposteTesi = await PropostaTesi.find({ docente: req.params.cognome });
      res.status(200).json(proposteTesi);
  } catch (error) {
      res.status(500).json({ error: error });
  }
});

/* OTTENERE TUTTE LE PROPOSTE TESI */ 

app.get('/api/proposteTesiAll', async (req, res) => {
  try {
      const proposteTesi = await PropostaTesi.find();
      res.status(200).json(proposteTesi);
  } catch (error) {
      res.status(500).json({ error: error });
  }
});



/* PORTA DI ASCOLTO DATABASE */

app.listen(3002, () => {
    console.log('Server is running on port 3002');
    });