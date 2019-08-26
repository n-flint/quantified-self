'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealFood = sequelize.define('MealFood', {
    FoodId: DataTypes.INTEGER,
    MealId: DataTypes.INTEGER
  }, {});
  MealFood.associate = function(models) {
    MealFood.belongsTo(models.Food);
    MealFood.belongsTo(models.Meal);
  };
  return MealFood;
};