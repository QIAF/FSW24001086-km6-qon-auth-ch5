const { createCar, getAllCars, getCarsById, editCar, deleteCar } = require("../controllers/carController");

const ImageHandler = require('../midlewares/ApiImageHandler');
const Validator = require('../midlewares/Validator');
const Authenticate = require('../midlewares/Authenticate');
const CheckRole = require('../midlewares/checkRole');
const { itemSchema, updateItemSchema, carSchema, carUpdateSchema } = require('../utils/joiValidation');



const router = require("express").Router();

router.get("/", Authenticate, CheckRole('superadmin','admin', 'member'), getAllCars);
router.get("/:id", Authenticate, CheckRole('superadmin','admin','member'), getCarsById);
router.post('/create', Authenticate, CheckRole('superadmin'), ImageHandler, Validator(carSchema), createCar);
router.patch('/update/:id', ImageHandler,Validator(carUpdateSchema), editCar);
router.delete('/delete/:id', Authenticate, CheckRole('superadmin'), deleteCar);

module.exports = router;
