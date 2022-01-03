var express = require("express");
const Insurance = require("../models/insurance.model");
const User = require('../models/user.model')
const multer = require('../../multer-config')
const { find } = require('../models/user.model')
var router = express.Router();

/* GET insurances listing. */

//get all insurances
/**
 * @swagger
* tags:
*  name: Insurance
*  description: This is for the main Insurance
* /insurance:
*  get:
*    tags: [Insurance]
*    description: Use to request all Insurances
*    responses:
*      '200':
*        description: A successful response
*/
router.get("/", async(req, res, next) => {
    try {
        const insurance = await Insurance.find();
        res.json(insurance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});





//Post insurances
/**
 * @swagger 
 * tags:
 *  name: Insurance
 *  description: This is for the main insurance
 * /insurance:
 *  post:
 *   tags: [Insurance]
 *   summary: Creates a new insurance.
 *   requestBody:
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             label:
 *              type: string
 *             NumContrat:
 *              type: string
 *             Agence:
 *              type: string
 *             dateDu:
 *              type: string
 *             dateAu:
 *              type: string
 *  responses:
 *      201:
 *         description: Created
 */

router.get("/:id", getInsurance, (req, res) => {
    res.json(res.insurance);
});
router.post("/", async(req, res, next) => {

    const insurance = new Insurance({
        label: req.body.label,
        NumContrat: req.body.NumContrat,
        Agence: req.body.Agence,
        dateDu: req.body.dateDu,
        dateAu: req.body.dateAu,
    });

    try {
        const newInsurance = await insurance.save();

        res.status(201).json({ newInsurance });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



/* Getting One by Id*/
router.get("/:id", getInsurance, (req, res) => {
    try {
        res.json(res.insurance)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

})
/* DELETE insurance . */

//delete insurance
/**
 * @swagger
* tags:
*  name: insurance
*  description: This is for the main insurance
* /insurance:
*  delete:
*    tags: [insurance]
*    description: Use to delete a insurance
*    responses:
*      '200':
*        description: A successful response
*/
 router.delete("/:id", getInsurance ,async(req, res) => {
     try {
         await res.Insurance.remove();
         res.json({ message: "deleted Post" });
     } catch (error) {
         res.status(500).json({ message: error.message });
     }
 });

//  router.patch("/:id", getCar, (req, res) => {
//      if (req.body.brand != null) {
//         res.car.brand = req.body.brand;
//      }
//     if (req.body.name != null) {
//         res.car.name = req.body.name;
//     }
//     if (req.body.type != null) {
//          res.car.type = req.body.type;
//      }
//      if (req.body.serialNumber != null) {
//          res.car.serialNumber = req.body.serialNumber;
//     }
//     if (req.body.place != null) {
//          res.car.place = req.body.place;
//     }

//      try {
//         res.car.save().then((updatedPost) => {
//              res.json(updatedPost);
//          });
//      } catch (error) {
//          res.status(400).json({ message: error.message });
//      }
//  });

 async function getInsurance(req, res, next) {
     try {
         insurance = await Insurance.findById(req.params.id);
         if (insurance == null) {
             return res.status(404).json({ message: "cannot find insurance" });
         }
     } catch (error) {
         return res.status(500).json({ message: error.message });
    }
     res.insurance = create;
    next();
 }


module.exports = router;