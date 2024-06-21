'use strict';
const fs = require('fs');
const csv = require('csv-parser');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = [];
    await new Promise((resolve, reject) => {
      fs.createReadStream('/Users/jalu/Documents/PRE-SKRIPSI/CCTV/public/table/LayerMarkerCSV.csv')
        .pipe(csv())
        .on('data', (row) => {
          data.push({
            content: row.Name,
            nama: row.Name,
            type: 'street',
            url: 'https://rtsp.me/embed/a653ZRBF/',
            lat: row.Latitude,
            lng: row.Longitude,
            access: 'public',
            createdAt: new Date(),
            updatedAt: new Date()
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });
    await queryInterface.bulkInsert('Cctvs', data);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cctvs', null, {});
  }
};