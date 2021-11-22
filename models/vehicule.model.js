const mongoose = require('mongoose');

var vehiculeSchema = new mongoose.Schema({
    Marque: {
        type: String,
        required: 'This field is required.'
    },
    Type: {
        type: String
    },
    Numematricule: {
        type: String
    },
    Venant: {
        type: String
    },    
    allant: {
        type: String
    }
});


// vehiculeSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');
mongoose.model('Vehicule', vehiculeSchema);