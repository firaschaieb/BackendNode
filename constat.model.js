const mongoose = require('mongoose');

var constatSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: 'This field is required.'
    },
    matricule: {
        type: String
    },
    type: {
        type: String
    },
    marque: {
        type: String
    },    
    
    conducteur: {
        type: String
    },
    permis: {
        type: String
    },
    deliv: {
        type: String
    },
    address: {
        type: String
    },
    mobile: {
        type: String
    },
    
    assure: {
        type: String
    },
    assurance: {
        type: String
    },
    typeassurance: {
        type: String
    },
    
    agence: {
        type: String
    },
});


// constatSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');
mongoose.model('', constatSchema);