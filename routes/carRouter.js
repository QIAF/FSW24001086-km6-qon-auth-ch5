const { createCar, getAllCars, getCarsById, editCar, deleteCar } = require("../controllers/carController");

const ImageHandler = require('../midlewares/ApiImageHandler');



const router = require("express").Router();

router.get("/", getAllCars);
router.get("/:id", getCarsById);
router.post('/', ImageHandler, createCar);
router.patch('/:id', ImageHandler, editCar);
router.delete('/:id', deleteCar);

module.exports = router;
