const Joi = require('joi');

//! LOGIN
const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).alphanum().required(),
});

//! Superadmin
const onlySuperAdmin = Joi.object({
	name: Joi.string().max(60).required(),
    age: Joi.number().max(30).required(),
    address: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
	role: Joi.string().required().valid('superadmin', 'admin', 'member'),
	password: Joi.string().min(8).alphanum().required(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Confirm password does not match password',
	}),
});

const onlySuperAdminUpdate = Joi.object({
	name: Joi.string().max(60).required(),
    age: Joi.number().max(30).required(),
    address: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
	role: Joi.string().required().valid('superadmin', 'admin', 'member'),
	password: Joi.string().min(8).alphanum().required(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Confirm password does not match password',
	}),
});

//! Admin & Member
const onlyMemberAndAdmin = Joi.object({
	name: Joi.string().max(60).required(),
    age: Joi.number().max(30).required(),
    address: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
	role: Joi.string().required().valid('superadmin', 'admin', 'member'),
	password: Joi.string().min(8).alphanum().required(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Confirm password does not match password',
	}),
});

const onlyMemberUpdate = Joi.object({
	name: Joi.string().max(60).required(),
    age: Joi.number().max(30).required(),
    address: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
	role: Joi.string().required().valid('superadmin', 'admin', 'member'),
	password: Joi.string().min(8).alphanum().required(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Confirm password does not match password',
	}),
});

const onlyAdminUpdate = Joi.object({
	name: Joi.string().max(60).required(),
    age: Joi.number().max(30).required(),
    address: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
	role: Joi.string().required().valid('superadmin', 'admin', 'member'),
	password: Joi.string().min(8).alphanum().required(),
	confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
		'any.only': 'Confirm password does not match password',
	}),
});

//! Cars
const carSchema = Joi.object({
    model: Joi.string().max(30).required(),
    type: Joi.string().required(),
    price: Joi.number().required(),
    imageUrl: Joi.string().required(),
    createdAt: Joi.date().required(),
    updateAt: Joi.date().required(),
});

const carUpdateSchema = Joi.object({
    model: Joi.string().max(30).required(),
    type: Joi.string().required(),
    price: Joi.number().required(),
    imageUrl: Joi.string().required(),
    createdAt: Joi.date().required(),
    updateAt: Joi.date().required(),
});

module.exports = {
	loginSchema,
	onlySuperAdmin,
	onlySuperAdminUpdate,
	onlyMemberAndAdmin,
	onlyMemberUpdate,
	onlyAdminUpdate,
	carSchema,
	carUpdateSchema,
};
