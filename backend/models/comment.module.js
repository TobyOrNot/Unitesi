const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    contenuto: {type: String, required: true},
    autore: {type: String, required:true},
    data: {type: String, required:true}
})

module.exports = mongoose.model('Comment', CommentSchema);