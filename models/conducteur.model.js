const mongoose = require('mongoose');

var conducteurSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    prenom: {
        type: String
    },
    permis: {
        type: String
    },
    address: {
        type: String
    },
    deliv: {
        type: String
    }
});



mongoose.model('Conducteur', conducteurSchema);