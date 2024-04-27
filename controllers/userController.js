require('dotenv/config');
const { randomUUID } = require('crypto');
const { Op, where } = require('sequelize');
const bcrypt = require("bcrypt");
const { auth, users } = require('../models');
const jwt = require('jsonwebtoken');
const handleUploadImage = require('../utils/handleUpload');

const imageKit = require('../libs/imagekit');
const createHttpError = require('http-errors');

const register = async (req, res) => {
	try {
		const {name, age, address, email, password, role, confirmPassword} = req.body;

		const saltRounds = 10;
		const hashedPassword = bcrypt.hashSync(password, saltRounds);

		const newUser = await users.create({
			name,
			address,
			role,
			age,
		});

		await auth.create({
			email,
			password: hashedPassword,
			userId: newUser.id,

		});

		res.status(201).json({
			status: 'OK',
			data: {
				id: newUser.id,
				name: newUser.name,
				address: newUser.address,
				role: newUser.role,
				age: newUser.age,
				email,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: error.message,
		});
	}
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if ((!email, !password)) {
      return next(createHttpError(400, {message:'please enter email or password'}));
    }
    const user = await auth.findOne({
      where: {
        email,
      },
      include: ["user"],
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.userId,
          username: user.name,
          role: user.role,
          email: user.email,
        },
        process.env.JWT_SECRET
      );
      res.status(200).json({
        status: "Success",
        message: "Login Seccess",
        data: token,
      });
    } else {
      return next (createHttpError(400, {message:"email atau password is wrong"}));
    }
  } catch (err) {
    return next(createHttpError(500, {message:err.message}));
  }
};
const userLoggedIn = async (req, res, next) => {
	try{
		const user = req.user;
		if (!user){
			return next(createHttpError(401, {message: 'Unauthorized'}));
		}
		res.status(200).json({
			status: true,
			data: {
				user: {
					id: user.id,
					name: user.name,
					role: user.role,

				},
				auth: {
					id:user.auth.id,
					userId: user.auth.userId,
					email: user.auth.email,
					password: user.auth.password
				},
			},
		})
	}catch(err){
		res.status(500).json({
			status: 'error',
			message: err.message,
		});
	}
};
const updateUser = async (req, res, next) => {
	const { name, age, address, email, password, confirmPassword} = req.body;
	let userId;
	try {
		if (req.params.id){
			userId = req.params.id;
			const user = user.findByPk(req.userId);
			if (!user){
				return next (createHttpError(404, "User not found"))
			}
		}else{
			userId = req.user.id;
		}

		let hashedPassword;
		const saltRounds = 10;
		hashedPassword = bcrypt.hashSync(password, saltRounds);

		await users.update(
			{
				name,
				age,
				address,
			},
			{
				where:{
				id: userId,
				},
			},
		);
		await auth.update(
			{
				email,
				password: hashedPassword,
			},
			{
				where: {
					userId: userId,
				},
			},
		);

		const updateData = await users.findByPk(userId,{
			include: ["auth"]
		});

		res.status(200).json({
			status: 'success',
			message:"update data successfully",
			data: updateData,
		});

	}catch(err){
		return next (createHttpError(400, 'error'));
	}
}
const deleteUser = async (req, res, next) => {
	try{
		const user = await users.findOne({
			where:{
				id: req.params.id,
			},
		});
		if (!user){
			return next (createHttpError(404, "user not found"));
		}
		await users.destroy ({
			where:{
				id: req.params.id,
			},
		});
		res.status(200).json({
			status: 'success',
			message:`successfully delete user ${user.name}`,
		})
	}catch (err) {
	return next (createHttpError(400));
	}
};


module.exports = {
	register,
	login,
	userLoggedIn,
	updateUser,
	deleteUser,
};
