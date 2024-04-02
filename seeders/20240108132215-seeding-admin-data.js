'use strict';
const {hashPassword} = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Admins', [{
      username: 'admin',
      password: hashPassword('admin'),
      role: 'superuser',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
}
