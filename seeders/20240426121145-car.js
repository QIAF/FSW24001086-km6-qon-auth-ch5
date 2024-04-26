'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     const carsData = [];

    for (let i = 1; i <= 5; i++) {

      carsData.push({
        model: `Car ${i}`,
        type: `type ${i}`,
        price: `${i}0000`,
        imageUrl: '',
        createdBy: 'qonit',
        createdAt: new Date(),
        deletedBy: '',
        deletedAt: new Date(),
        updatedBy: '',
        updatedAt: new Date(),
      });
    }
  return queryInterface.bulkInsert('cars', carsData);
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('cars', null,{});
  }
};