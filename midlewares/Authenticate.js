const jwt = require("jsonwebtoken");
const { users } = require("../models");
const createHttpError = require("http-errors");

module.exports = async (req, res, next) => {
    try {
			const bearerToken = req.headers.authorization;

			if (!bearerToken) {
				return next(createHttpError(500, { message: 'Token not found!' }));
			}

			const token = bearerToken.split('Bearer ')[1];

			const payload = jwt.verify(token, process.env.JWT_SECRET);

			const user = await users.findByPk(payload.id, {
				include: ['auth'],
			});

			if (!user) {
				return next(createHttpError(401, { message: 'Unauthorized, please login' }));
			}

			req.user = user;
			next();
		} catch (error) {
			next(createHttpError(500, { message: error.message }));
		}
};
