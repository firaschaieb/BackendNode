const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://firas123:azerty123@constat.cpine.mongodb.net/constat', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./assure.model');
require('./assurance.model')
require('./conducteur.model')
require('./vehicule.model')