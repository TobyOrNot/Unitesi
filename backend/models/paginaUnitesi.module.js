const mongoose = require('mongoose');

const PaginaUnitesiSchema = mongoose.Schema({
    titolo: { type: String, required: true },
    descrizione: { type: String, required: true },
    relatoreEmail: { type: String, required: true },
    studenteEmail: { type: String, required: true },
    correlatoriEmail: { type: [String], required: true },
    dataCreazione: { type: Date, default: Date.now, required: true },
    checkpoints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Checkpoint'}]  
});

module.exports = mongoose.model('PaginaUnitesi', PaginaUnitesiSchema);