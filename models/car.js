'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      car.belongsTo(models.shop,{
        fereignKey: {
          name: "shopId",
        },
      });
      car.belongsTo(model.user, {
        fereignKey: {
          name: "userId",
        },
      });
    }
  }
  car.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    imageUrl: DataTypes.ARRAY(DataTypes.TEXT),
    userId: {
      type: DataTypes.INTEGER,
    },
    shopId: {
      type: DataTypes.INTEGER,
    },
  }, 
  {
    sequelize,
    modelName: 'car',
  });
  return car;
};