'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.auth, {
        foreignKey: {
          name: "shopId",
        },
      });

      user.hasMany(models.car, {
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  user.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    role: {
      type: DataTypes.ENUM(["Admin", "Manager", "Staff"]),
      defaultValue: "Staff",
    },
    city: DataTypes.STRING,
    imageUrl: {
      type: DataTypes.TEXT,
      // defaultValue: ""
    },
    shopId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};