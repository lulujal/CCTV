'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DenahGedungs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url1: {
        type: Sequelize.STRING
      },
      url2: {
        type: Sequelize.STRING
      },
      url3: {
        type: Sequelize.STRING
      },
      url4: {
        type: Sequelize.STRING
      },
      url5: {
        type: Sequelize.STRING
      },
      url6: {
        type: Sequelize.STRING
      },
      nama_gedung: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DenahGedungs');
  }
};