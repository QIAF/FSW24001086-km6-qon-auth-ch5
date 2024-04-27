'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
        name: "Qonit",
        age: 20,
        address: "Jogja",
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {
        name: "Jojo",
        age: 20,
        address: "Bekasi",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "ryy",
        age: 20,
        address: "Jakarta",
        role: "member",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const insertUsers = await queryInterface.bulkInsert("users", users, {
      returning: true,
    });

    const password = 'password';
		const confirmPassword = password;

		const saltRounds = 10;
		const hashedPassword = bcrypt.hashSync(password, saltRounds);
		const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

    const userDataAuth = insertUsers.map((users)=>{
      return {
        userId: users.id,
        email:`${users.role}@mail.com`,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
    const userAuth = await queryInterface.bulkInsert('auths', userDataAuth, {
      returning: true,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {returning: true});
    await queryInterface.bulkDelete('auths', null, { returning: true});

  }
};
