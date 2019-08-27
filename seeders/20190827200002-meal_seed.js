'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Meals', [{
      name: 'meal_1',
    },
    {
      name: 'meal_2'
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Meals', null, {});
  }
};
