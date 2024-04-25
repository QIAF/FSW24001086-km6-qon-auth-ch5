'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      auth.belonngTo(models.User,{
        foreignKey:{
          name: "userId",
          allowNull: false,
        },
      });
    }
  }
  auth.init({
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        isEmail: {
          msg: 'Please enter a valid email',
        },
      },
    },
    password: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: 'auth',
  }
);
  return auth;
};