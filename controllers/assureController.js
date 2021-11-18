const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Assure = mongoose.model('Assure');

router.get('/', (req, res) => {
    res.render("assure/addOrEdit", {
        viewTitle: "Insert assure"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var assure = new Assure();
    assure.name = req.body.name;
    assure.prenom = req.body.prenom;
    assure.mobile = req.body.mobile;
    assure.address = req.body.address;
    assure.save((err, doc) => {
        if (!err)
            res.redirect('assure/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("assure/addOrEdit", {
                    viewTitle: "Insert assure",
                    assure: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Assure.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('assure/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("assure/addOrEdit", {
                    viewTitle: 'Update assure',
                    assure: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Assure.find((err, docs) => {
        if (!err) {
            res.render("assure/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving assure list :' + err);
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
    Assure.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("assure/addOrEdit", {
                viewTitle: "Update assure",
                assure: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Assure.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/assure/list');
        }
        else { console.log('Error in assure delete :' + err); }
    });
});

module.exports = router;