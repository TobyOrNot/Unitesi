const mongoose = require('mongoose');

const propostaTesiSchema = mongoose.Schema({
    titolo: { type: String, required: true },
    descrizione: { type: String, required: true },
    docente: { type: String, required: true },
});


module.exports = mongoose.model('PropostaTesi', propostaTesiSchema);