'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: { type: DataTypes.STRING, allowNull: false },
    calories: { type: DataTypes.INTEGER, allowNull: false }
  }, {});
  Food.associate = function(models) {
    // associations can be defined here
  };
  return Food;
};
