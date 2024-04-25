const { Car, Shop, User } = require("../models");
const imagekit = require("../lib/imagekit");
const ApiError = require("../utils/apiError");
const { Op } = require("sequelize");

const createCar = async (req, res, next) => {
  const { name, price, stock } = req.body;
  const files = req.files;
  let images = [];

  try {
    if (files) {
      await Promise.all(
        files.map(async (file) => {
          const split = file.originalname.split(".");
          const extension = split[split.length - 1];

          const uploadedImage = await imagekit.upload({
            file: file.buffer,
            fileName: `IMG-${Date.now()}.${extension}`,
          });
          images.push(uploadedImage.url);
        })
      );
    }

    let shopId;
    if (req.user.role === "Admin") {
      if (!req.body.shopId) {
        return next(
          new ApiError(
            "The 'shopId' field is required to create a car. Please provide the 'shopId' in the request body.",
            400
          )
        );
      }
      shopId = req.body.shopId;
    } else {
      shopId = req.user.shopId;
    }

    const newCar = await Car.create({
      name,
      price,
      stock,
      imageUrl: images,
      userId: req.user.id,
      shopId,
    });

    res.status(200).json({
      status: "Success",
      data: {
        newCar,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findCars = async (req, res, next) => {
  try {
    const { carName, username, shop, page, limit } = req.query;
    const condition = {};
    if (carName) condition.name = { [Op.iLike]: `%${carName}%` };

    const includeShopCondition = {};
    if (shop) includeShopCondition.name = { [Op.iLike]: `%${shop}%` };

    const includeUserCondition = {};
    if (username) includeUserCondition.name = { [Op.iLike]: `${username}%` };

    const pageNum = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const offset = (pageNum - 1) * pageSize;

    let whereCondition = condition;

    if (req.user.role === "Admin") {
      whereCondition;
    } else {
      whereCondition = {
        ...condition,
        shopId: req.user.shopId,
      };
    }

    const totalCount = await Car.count({ where: whereCondition });

    const cars = await Car.findAll({
      include: [
        {
          model: Shop,
          where: includeShopCondition,
          attributes: ["id", "name"],
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
      where: whereCondition,
      order: [["id", "ASC"]],
      attributes: ["id", "name", "price", "stock", "createdAt", "updatedAt"],
      limit: pageSize,
      offset: offset,
    });

    const totalPages = Math.ceil(totalCount / pageSize);

    res.status(200).json({
      status: "Success",
      data: {
        cars,
        pagination: {
          totalData: totalCount,
          totalPages,
          pageNum,
          pageSize,
        },
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findCarById = async (req, res, next) => {
  try {
    const car = await Car.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!car) {
      return next(
        new ApiError(`cart with this ${req.params.id} is not exist`, 404)
      );
    }

    if (car.shopId !== req.user.shopId) {
      return next(new ApiError("Your shop is not owner of this car", 401));
    }

    res.status(200).json({
      status: "Success",
      data: {
        car,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const UpdateCar = async (req, res, next) => {
  const { name, price, stock } = req.body;
  const files = req.files;
  let images = [];

  try {
    if (files) {
      await Promise.all(
        files.map(async (file) => {
          const split = file.originalname.split(".");
          const extension = split[split.length - 1];

          const uploadedImage = await imagekit.upload({
            file: file.buffer,
            fileName: `IMG-${Date.now()}.${extension}`,
          });
          images.push(uploadedImage.url);
        })
      );
    }

    let shopId;
    if (req.user.role === "Admin") {
      if (!req.body.shopId) {
        return next(
          new ApiError(
            "The 'shopId' field is required to create a car. Please provide the 'shopId' in the request body.",
            400
          )
        );
      }
      shopId = req.body.shopId;
    } else {
      shopId = req.user.shopId;
    }

    await Car.update(
      {
        name,
        price,
        stock,
        imageUrl: images,
        userId: req.user.id,
        shopId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "Success update car",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteCar = async (req, res, next) => {
  const id = req.params.id;

  try {
    await Car.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "Success delete car",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  createCar,
  findCars,
  findCarById,
  UpdateCar,
  deleteCar,
};
