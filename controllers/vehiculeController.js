const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Vehicule = mongoose.model('Vehicule');

router.get('/', (req, res) => {
    res.render("vehicule/addOrEdit", {
        viewTitle: "Insert vehicule"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var vehicule = new Vehicule();
    vehicule.Marque = req.body.Marque;
    vehicule.Type = req.body.Type;
    vehicule.Numematricule = req.body.Numematricule;
    vehicule.Venant = req.body.Venant;
    vehicule.allant = req.body.allant;
    vehicule.save((err, doc) => {
        if (!err)
            res.redirect('vehicule/list');
        else {
            if (err.marque == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("vehicule/addOrEdit", {
                    viewTitle: "Insert vehicule",
                    vehicule: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Vehicule.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('vehicule/list'); }
        else {
            if (err.marque == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("vehicule/addOrEdit", {
                    viewTitle: 'Update vehicule',
                    vehicule: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Vehicule.find((err, docs) => {
        if (!err) {
            res.render("vehicule/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving vehicule list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'Marque':
                body['MarqueError'] = err.errors[field].message;
                break;
            case 'Type':
                body['TypeError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Vehicule.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("vehicule/addOrEdit", {
                viewTitle: "Update vehicule",
                vehicule: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Vehicule.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/vehicule/list');
        }
        else { console.log('Error in vehicule delete :' + err); }
    });
});

module.exports = router;