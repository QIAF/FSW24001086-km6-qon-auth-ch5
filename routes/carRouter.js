const { createCar, getAllCars, getCarsById, editCar, deleteCar } = require("../controllers/carController");

const ImageHandler = require('../midlewares/ApiImageHandler');
const Validator = require('../midlewares/Validator');
const Authenticate = require('../midlewares/Authenticate');
const CheckRole = require('../midlewares/checkRole');
const upload = require('../midlewares/upload');
const { itemSchema, updateItemSchema, carSchema, carUpdateSchema } = require('../utils/joiValidation');



const router = require("express").Router();

router.get("/", Authenticate, CheckRole('superadmin','admin', 'member'), getAllCars);
router.get("/:id", Authenticate, CheckRole('superadmin','admin','member'), getCarsById);
router.post('/', Authenticate, CheckRole('superadmin'), upload.array ('image'), Validator(carSchema), createCar);
router.patch('/:id', Authenticate, CheckRole("superadmin"), upload.array ('image'),Validator(carUpdateSchema), editCar);
router.delete('/:id', Authenticate, CheckRole('superadmin'), deleteCar);

module.exports = router;
