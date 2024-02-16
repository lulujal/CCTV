'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DenahGedung extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Cctv,{foreignKey:'CctvId'})
    }
  }
  DenahGedung.init({
    url1: DataTypes.STRING,
    url2: DataTypes.STRING,
    url3: DataTypes.STRING,
    url4: DataTypes.STRING,
    url5: DataTypes.STRING,
    url6: DataTypes.STRING,
    nama_gedung: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'DenahGedung',
  });
  return DenahGedung;
};