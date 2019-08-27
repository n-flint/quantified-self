var shell = require('shelljs');
var {sequelize} = require('../../models');

module.exports = () => {
  sequelize.close();
  shell.exec('npx sequelize db:drop', {silent: true});
}
