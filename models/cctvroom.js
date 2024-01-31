'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cctvroom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cctvroom.init({
    content: DataTypes.STRING,
    nama: DataTypes.STRING,
    url: DataTypes.STRING,
    x: DataTypes.STRING,
    y: DataTypes.STRING,
    lantai: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'cctvroom',
  });
  return cctvroom;
};