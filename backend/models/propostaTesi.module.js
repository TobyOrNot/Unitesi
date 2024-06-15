const mongoose = require('mongoose');

const propostaTesiSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titolo: { type: String, required: true },
    descrizione: { type: String, required: true },
    docente: { type: String, required: true },
});


module.exports = mongoose.model('PropostaTesi', propostaTesiSchema);