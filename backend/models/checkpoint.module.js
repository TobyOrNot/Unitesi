const mongoose = require('mongoose');

const CheckpointSchema = mongoose.Schema({
    index: {type: Number, required:true},
    radius: {type: Number, required: true},
    titolo: { type: String, required: true },
    descrizione: { type: String, required: true },
    dataScadenza: { type: String, required: true},
    commenti: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    documenti: { type: [String], required: true},
    validato: { type: Boolean, required: true},
});


module.exports = mongoose.model('Checkpoint', CheckpointSchema);
