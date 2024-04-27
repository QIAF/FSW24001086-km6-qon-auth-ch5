'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cars.init({
    model: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.FLOAT,
    imageUrl: DataTypes.ARRAY(DataTypes.TEXT),
    createdBy: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    deletedBy: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    updatedBy: DataTypes.STRING,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'cars',
  });
  return cars;
};