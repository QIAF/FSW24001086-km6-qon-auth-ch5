const { createCar, getAllCars, getCarsById, editCar, deleteCar } = require("../controllers/carController");

const ImageHandler = require('../midlewares/ApiImageHandler');
const Validator = require('../midlewares/Validator');
const Authenticate = require('../midlewares/Authenticate');
const CheckRole = require('../midlewares/checkRole');
const { itemSchema, updateItemSchema } = require('../utils/joiValidation');



const router = require("express").Router();

router.get("/", Authenticate, CheckRole('superadmin','admin', 'member'), getAllCars);
router.get("/:id", Authenticate, CheckRole('superadmin','admin','member'), getCarsById);
router.post('/', Authenticate, CheckRole('superadmin','admin'), ImageHandler, createCar);
router.patch('/:id', ImageHandler, editCar);
router.delete('/:id', deleteCar);

module.exports = router;
