const { createCar, getAllCars, getCarsById, editCar, deleteCar } = require("../controllers/carController");
const { register, userLoggedIn, updateUser, deleteUser } = require("../controllers/userController");

const ImageHandler = require('../midlewares/ApiImageHandler');



const router = require("express").Router();

router.post("/register", register);
router.get("/me", userLoggedIn );
router.post('/admin/register', register);
router.post('/login',)
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
