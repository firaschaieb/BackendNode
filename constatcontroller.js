const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const constat = mongoose.model('constat');

router.get('/', (req, res) => {
    res.render("constat/addOrEdit", {
        viewTitle: "Insert constat"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var constat = new constat();
    constat.Name = req.body.Name;
    constat.matricule = req.body.NumContrat;
    constat.type = req.body.NumContrat;
    constat.marque = req.body.NumContrat;
    constat.conducteur = req.body.NumContrat;
    constat.permis = req.body.NumContrat;
    constat.deliv = req.body.NumContrat;
    constat.address = req.body.NumContrat;
    constat.mobile = req.body.NumContrat;
    constat.assure = req.body.Agence;
    constat.assurance = req.body.dateDu;
    constat.typeassurance = req.body.dateAu;
    constat.agence = req.body.NumContrat;
    constat.save((err, doc) => {
        if (!err)
            res.redirect('constat/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("constat/addOrEdit", {
                    viewTitle: "Insert constat",
                    constat: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    constat.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('constat/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("constat/addOrEdit", {
                    viewTitle: 'Update constat',
                    constat: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    constat.find((err, docs) => {
        if (!err) {
            res.render("constat/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving constat list :' + err);
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
                body['NameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    constat.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("constat/addOrEdit", {
                viewTitle: "Update constat",
                constat: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    constat.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            
            res.redirect('/constat/list');
        }
        else { console.log('Error in constat delete :' + err); }
    });
});

module.exports = router;