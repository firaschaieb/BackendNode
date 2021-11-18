const mongoose = require('mongoose');

var assuranceSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: 'This field is required.'
    },
    NumContrat: {
        type: String
    },
    Agence: {
        type: String
    },
    dateDu: {
        type: String
    },    
    dateAu: {
        type: String
    }
});


// assuranceSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');
mongoose.model('Assurance', assuranceSchema);