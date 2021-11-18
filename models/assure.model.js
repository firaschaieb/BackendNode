const mongoose = require('mongoose');

var assureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    prenom: {
        type: String
    },
    mobile: {
        type: String
    },
    address: {
        type: String
    }
});



mongoose.model('Assure', assureSchema);