var express = require("express");
const Car = require("../models/car.model");
const User = require('../models/user.model')
const multer = require('../../multer-config')
const { find } = require('../models/user.model')
var router = express.Router();

/* GET cars listing. */

//get all cars
/**
 * @swagger
* tags:
*  name: Car
*  description: This is for the main Car
* /car:
*  get:
*    tags: [Car]
*    description: Use to request all Cars
*    responses:
*      '200':
*        description: A successful response
*/
router.get("/", async(req, res, next) => {
    try {
        const car = await Car.find();
        res.json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/bytype/:type", async(req, res, next) => {
    try {
        const ca = await Car.find({ type: req.params.type });
        res.json(ca);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/byuser/:username", async(req, res, next) => {
    try {
        const ca = await Car.find({ username: req.params.username });
        res.json(ca);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Post cars
/**
 * @swagger 
 * tags:
 *  name: Car
 *  description: This is for the main Car
 * /car:
 *  post:
 *   tags: [Car]
 *   summary: Creates a new car.
 *   requestBody:
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             band:
 *              type: string
 *             name:
 *              type: string
 *             type:
 *              type: string
 *             serialNumber:
 *              type: string
 *             carsInSerial:
 *              type: string
 *  responses:
 *      201:
 *         description: Created
 */

router.get("/:id", getCar, (req, res) => {
    res.json(res.car);
});
router.post("/", async(req, res, next) => {
    const user = await res.user
    const car = new Car({
        brand: req.body.brand,
        name: req.body.name,
        type: req.body.type,
        serialNumber: req.body.serialNumber,
        carsInSerial: req.body.carsInSerial,

    });

    try {
        const newCar = await car.save();

        res.status(201).json({ newCar });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/*Get Posts by author*/
router.get("/byAuthor/:username", async (req, res, next) => {
    try {
        const cars = await Car.find({ username: req.params.username })
        res.json(cars)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

/* Getting One by Id*/
router.get("/:id", getCar, (req, res) => {
    try {
        res.json(res.car)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

})
/* DELETE car . */

//delete car
/**
 * @swagger
* tags:
*  name: Car
*  description: This is for the main Car
* /car:
*  delete:
*    tags: [Car]
*    description: Use to delete a car
*    responses:
*      '200':
*        description: A successful response
*/
 router.delete("/:id", getCar ,async(req, res) => {
     try {
         await res.Car.remove();
         res.json({ message: "deleted Post" });
     } catch (error) {
         res.status(500).json({ message: error.message });
     }
 });
//Patch cars
/**
 * @swagger 
 * tags:
 *  name: Car
 *  description: This is for the main Car
 * /car:
 *  patch:
 *   tags: [Car]
 *   summary: Updates a new car.
 *   requestBody:
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             band:
 *              type: string
 *             name:
 *              type: string
 *             type:
 *              type: string
 *             serialNumber:
 *              type: string
 *             carsInSerial:
 *              type: string
 *  responses:
 *      201:
 *         description: Created
 */

 router.patch("/:id", getCar, (req, res) => {
    if (req.body.brand != null) {
       res.car.brand = req.body.brand;
    }
   if (req.body.name != null) {
       res.car.name = req.body.name;
   }
   if (req.body.type != null) {
        res.car.type = req.body.type;
    }
    if (req.body.serialNumber != null) {
        res.car.serialNumber = req.body.serialNumber;
   }
   if (req.body.place != null) {
        res.car.place = req.body.place;
   }

    try {
       res.car.save().then((updatedPost) => {
            res.json(updatedPost);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

 async function getCar(req, res, next) {
     try {
         car = await Car.findById(req.params.id);
         if (car == null) {
             return res.status(404).json({ message: "cannot find car" });
         }
     } catch (error) {
         return res.status(500).json({ message: error.message });
    }
     res.car = create;
    next();
 }

 async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.user = user
    console.log(user);
    next()
}
module.exports = router;