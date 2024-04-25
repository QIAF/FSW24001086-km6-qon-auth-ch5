const ApiError = require("../utils/apiError");
const { Car } = require("../models");

const checkOwnership = async (req, res, next) => {
  if (req.user.role === "Admin") {
    return next();
  }

  const car = await Car.findByPk(req.params.id);

  if (!car || (car.shopId && car.shopId !== req.user.shopId)) {
    return next(new ApiError("You don't have access to this car", 401));
  }

  next();
};

module.exports = checkOwnership;
