'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cctv extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.DenahGedung,{foreignKey:'CctvId'})
      this.hasMany(models.cctvroom,{foreignKey:'CctvId'})
    }
  }
  Cctv.init({
    content: DataTypes.STRING,
    nama: DataTypes.STRING,
    type: DataTypes.STRING,
    access: DataTypes.STRING,
    url: DataTypes.STRING,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Cctv',
  });
  return Cctv;
};