'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      shop.hasMany(models.user,{
        foreignKey: {
          name: "shopId",
        },
      });
      shop.hasMany(models.car,{
        foreignKey:{
          name: "shopId",
        },
      });
    }
  }
  shop.init({
    name: DataTypes.STRING,
    city: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [["Yogyakarta", "Jakarta", "Surabaya", "Solo"]],
          msg: "Shop doesn't exist in that city",
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'shop',
  });
  return shop;
};