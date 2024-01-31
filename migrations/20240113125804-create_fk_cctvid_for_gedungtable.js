'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('DenahGedungs', 'CctvId', {
      type: Sequelize.INTEGER});

    await queryInterface.addConstraint('DenahGedungs', {
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
    await queryInterface.removeConstraint('DenahGedungs', 'custom_fkey_CctvId');
    await queryInterface.removeColumn('DenahGedungs', 'CctvId');
  }
};
