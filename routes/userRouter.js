const express = require('express')
const router = require("express").Router();

const Validator = require('../midlewares/Validator');
const Authenticate = require('../midlewares/Authenticate');
const CheckRole = require('../midlewares/checkRole');
const { itemSchema, updateItemSchema, onlySuperAdmin, onlySuperAdminUpdate } = require('../utils/joiValidation');

const { register, userLoggedIn, updateUser, deleteUser, login } = require("../controllers/userController");
const upload = require('../libs/multer');


router.post("/register", register);
router.get("/me", Authenticate, userLoggedIn );
router.post('/login', login);

router.get('/', Authenticate, CheckRole('superadmin', 'admin'));
router.get('/', Authenticate, CheckRole('superadmin', 'admin'));

router.post('/admin/register', Authenticate, CheckRole('superadmin'),Validator(onlySuperAdmin), register);
router.patch('/:id', Authenticate, CheckRole('superadmin'),Validator(onlySuperAdminUpdate), updateUser);
router.delete('/:id', Authenticate, CheckRole('superadmin'), deleteUser);

module.exports = router;