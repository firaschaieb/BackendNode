var express = require("express");
const Driver = require("../models/driver.model");
const User = require('../models/user.model')
const multer = require('../../multer-config')
const { find } = require('../models/user.model')
var router = express.Router();

/* GET drivers listing. */

//get all drivers
/**
 * @swagger
* tags:
*  name: Driver
*  description: This is for the main Driver
* /driver:
*  get:
*    tags: [Driver]
*    description: Use to request all Drivers
*    responses:
*      '200':
*        description: A successful response
*/
router.get("/", async(req, res, next) => {
    try {
        const driver = await Driver.find();
        res.json(driver);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});





//Post drivers
/**
 * @swagger 
 * tags:
 *  name: Driver
 *  description: This is for the main Driver
 * /driver:
 *  post:
 *   tags: [Driver]
 *   summary: Creates a new driver.
 *   requestBody:
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *              type: string
 *             prenom:
 *              type: string
 *             permis:
 *              type: string
 *             address:
 *              type: string
 *             deliv:
 *              type: string
 *  responses:
 *      201:
 *         description: Created
 */

router.get("/:id", getDriver, (req, res) => {
    res.json(res.driver);
});
router.post("/", async(req, res, next) => {

    const driver = new Driver({
        name: req.body.name,
        prenom: req.body.prenom,
        permis: req.body.permis,
        address: req.body.address,
        deliv: req.body.deliv,
    });

    try {
        const newDriver = await driver.save();

        res.status(201).json({ newDriver });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



/* Getting One by Id*/
router.get("/:id", getDriver, (req, res) => {
    try {
        res.json(res.driver)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

})
/* DELETE driver . */

//delete driver
/**
 * @swagger
* tags:
*  name: Driver
*  description: This is for the main Driver
* /driver:
*  delete:
*    tags: [Driver]
*    description: Use to delete a driver
*    responses:
*      '200':
*        description: A successful response
*/
 router.delete("/:id", getDriver ,async(req, res) => {
     try {
         await res.Driver.remove();
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

 async function getDriver(req, res, next) {
     try {
         driver = await Driver.findById(req.params.id);
         if (driver == null) {
             return res.status(404).json({ message: "cannot find driver" });
         }
     } catch (error) {
         return res.status(500).json({ message: error.message });
    }
     res.driver = create;
    next();
 }


module.exports = router;