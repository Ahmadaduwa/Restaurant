'use strict';
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashpassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await queryInterface.bulkInsert('user', [{
      email: process.env.ADMIN_EMAIL,
      password: hashpassword,
      userType: '0',
      firstName: "Admin",
      lastName: "User",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
 
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('user', {userType: '0'}, {});
    
  }
};
