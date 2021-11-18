const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Assurance = mongoose.model('Assurance');

router.get('/', (req, res) => {
    res.render("assurance/addOrEdit", {
        viewTitle: "Insert assurance"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var assurance = new Assurance();
    assurance.Name = req.body.Name;
    assurance.NumContrat = req.body.NumContrat;
    assurance.Agence = req.body.Agence;
    assurance.dateDu = req.body.dateDu;
    assurance.dateAu = req.body.dateAu;
    assurance.save((err, doc) => {
        if (!err)
            res.redirect('assurance/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("assurance/addOrEdit", {
                    viewTitle: "Insert assurance",
                    assurance: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Assurance.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('assurance/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("assurance/addOrEdit", {
                    viewTitle: 'Update assurance',
                    assurance: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Assurance.find((err, docs) => {
        if (!err) {
            res.render("assurance/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving assurance list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'Name':
                body['NameError'] = err.errors[field].message;
                break;
            case 'NumContrat':
                body['NumContratError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Assurance.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("assurance/addOrEdit", {
                viewTitle: "Update assurance",
                assurance: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Assurance.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/assurance/list');
        }
        else { console.log('Error in assurance delete :' + err); }
    });
});

module.exports = router;