const createHttpError = require('http-errors');

const checkRole = (...roles) => {
  return async (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return next(createHttpError(403, {message:'you dont have an accsess'}));
      }
      next();
    } catch (err) {
      return next(createHttpError( 500,{message:err.message}));
    }
  };
};

module.exports = checkRole;
