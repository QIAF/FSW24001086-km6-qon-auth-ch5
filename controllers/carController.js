require('dotenv/config');

const { randomUUID } = require('crypto');
const { Op } = require('sequelize');
const { cars } = require('../models');
const handleUploadImage = require('../utils/handleUpload');
// const { createDataValidation, updateDataValidation } = require('../validations/car-validation');

const imagekit = require('../libs/imagekit');

const getAllCars = async (req, res) => {
	try {
		const allCars = await cars.findAll();

		res.status(200).json({
			status: 'OK',
			totalData: allCars.length,
			requestAt: req.requestTime,
			data: allCars,
		});
	} catch (error) {
		res.status(500).json({
			status: 'FAILED',
			message: error.message,
		});
	}
};
const getCarsById = async (req, res) => {
	try {
		const id = req.params.id;
		const car = await cars.findByPk(id);

		if (!car) {
			throw new Error('Car Not Found!');
		}
		res.status(200).json({
			status: 'OK',
			data: car,
		});
	} catch (error) {
		res.status(404).json({
			status: 'FAILED',
			message: error.message,
		});
	}
};

const createCar = async (req, res) => {
	try {
		const data = req.body;
		const files = req.files;

		const images = {
			imagesUrl: [],
			imagesId: [],
		};

		 if (files) {
			const { imagesUrl, imagesId } = await handleUploadImage(files);

			images.imagesUrl = imagesUrl;
			images.imagesId = imagesId;
			}

        data.createdBy=req.user.name ;
        data.updatedBy = '';
        data.deleteBy = '';
		data.imageUrl = images.imagesUrl;
        data.createdAt= new Date();
        data.updatedAt = new Date();

		const car = await cars.create(data);

		res.status(201).json({
			status: 'Success',
			message: 'Success create data!',
			data: car,
		});
	} catch (error) {
		res.status(400).json({
			status: 'FAIL',
			message: error.message,
		});
	}
};

const editCar = async (req, res) => {
	try {
        const car = await cars.findByPk(req.params.id);
		const data = req.body;
		const file = req.file;

		if (file) {
			console.log("file")
			const strFile = file.buffer.toString('base64');
			const { url, fileId } = await handleUploadImage(file, strFile);

			data.imageUrl = url;

		} else {
			data.imageUrl = car.imageUrl;
		}
		console.log(data);

		data.updatedBy= req.user.name;

		await cars.update(data, {
			where: {
				id: req.params.id,
			},
		});

		res.status(200).json({
			status: 'OK',
			message: 'Update data success!',
			data: req.body,
		});
	} catch (error) {
		res.status(400).json({
			status: 'FAIL',
			message: error.message,
		});
	}
};

const deleteCar = async (req, res) => {
	try {
		const car = await cars.findByPk(req.params.id);

		if (!car) {
			throw Error('Car Not Found!');
		}
		await car.update({
			deleteBy:req.user.name,

		},{
			where:{
				id:req.params.id,
			}
		});

		await cars.destroy({
			where: {
				id: req.params.id,
			},
		});

		res.status(200).json({
			status: 'OK',
			message: 'Delete data success!',
		});
	} catch (error) {
		res.status(400).json({
			status: 'FAIL',
			message: error.message,
		});
	}
};

module.exports = {
	getAllCars,
	getCarsById,
	createCar,
	editCar,
	deleteCar,
};