const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Conducteur = mongoose.model('Conducteur');

router.get('/', (req, res) => {
    res.render("conducteur/addOrEdit", {
        viewTitle: "Insert conducteur"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var conducteur = new Conducteur();
    conducteur.name = req.body.name;
    conducteur.prenom = req.body.prenom;
    conducteur.permis = req.body.permis;
    conducteur.address = req.body.address;
    conducteur.deliv = req.body.deliv;
    conducteur.save((err, doc) => {
        if (!err)
            res.redirect('conducteur/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("conducteur/addOrEdit", {
                    viewTitle: "Insert conducteur",
                    conducteur: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Conducteur.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('conducteur/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("conducteur/addOrEdit", {
                    viewTitle: 'Update conducteur',
                    conducteur: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Conducteur.find((err, docs) => {
        if (!err) {
            res.render("conducteur/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving conducteur list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;    
            case 'prenom':
                body['prenomError'] = err.errors[field].message;
                break;
            case 'address':
                body['addressError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Conducteur.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("conducteur/addOrEdit", {
                viewTitle: "Update conducteur",
                conducteur: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Conducteur.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/conducteur/list');
        }
        else { console.log('Error in conducteur delete :' + err); }
    });
});

module.exports = router;