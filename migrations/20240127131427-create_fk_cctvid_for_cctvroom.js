'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('cctvrooms', 'CctvId', {
      type: Sequelize.INTEGER});

    await queryInterface.addConstraint('cctvrooms', {
      fields: ['CctvId'],
      type: 'foreign key',
      name: 'custom_fkey_CctvId',
      references: {
        table: 'Cctvs',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('cctvrooms', 'custom_fkey_CctvId');
    await queryInterface.removeColumn('cctvrooms', 'CctvId');
  }
};
