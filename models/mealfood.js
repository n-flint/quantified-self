'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealFood = sequelize.define('MealFood', {
    food_id: DataTypes.INTEGER
  }, {});
  MealFood.associate = function(models) {
    MealFood.belongsTo(models.Food);
    MealFood.belongsTo(models.Meal);
  };
  return MealFood;
};