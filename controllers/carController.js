require('dotenv/config');

const { randomUUID } = require('crypto');
const { Op } = require('sequelize');
const { cars } = require('../models');
const handleUploadImage = require('../utils/handleUpload');
// const { createDataValidation, updateDataValidation } = require('../validations/car-validation');

const imageKit = require('../libs/imagekit');

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
		const file = req.file;
        console.log(file);

		if (file) {
			const strFile = file.buffer.toString('base64');

			const { url, fileId } = await handleUploadImage(file, strFile);
            console.log(url);


			data.imageUrl = url;
		}
        data.createdBy = 'qonit';
        data.updatedBy = '';
        data.deleteBy = '';
        data.createdAt= new Date();
        data.updatedAt = new Date();

		const car = await cars.create(data);

		res.status(201).json({
			status: 'OK',
			message: 'Data Berhasil Disimpan!',
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

		await cars.update(data, {
			where: {
				id: req.params.id,
			},
		});

		res.status(200).json({
			status: 'OK',
			message: 'Data Berhasil Diperbarui!',
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

		// if (car.imageUrl != '' || car.imageUrl_id != '') {
		// 	await imageKit.deleteFile(car.imageUrl_id);
		// }

		await cars.destroy({
			where: {
				id: req.params.id,
			},
		});

		res.status(200).json({
			status: 'OK',
			message: 'Data Berhasil Dihapus!',
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