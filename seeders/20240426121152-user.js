'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
        name: "Qonit",
        age:20,
        address:"Jogja",
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        name: "Jojo",
        age: 20,
        address: "Bekasi",
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const insertUsers = await queryInterface.bulkInsert("users", users, {
      returning: true,
    });
    const password = [
      "$2a$12$pU6nd0jlNVbD16I78CcEMeTnyX7EacB2R9hjQvhlwPPscyw0NaZsa",
      "$2a$12$mT8A9t.nBnzwWDkl5HqXs.Bppw4Ei/iezCiuDhV9VJu0i6FPIvuf."
    ]
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("users");

  }
};
