var shell = require('shelljs');

module.exports = () => {
  shell.exec('npx sequelize db:drop');
  shell.exec('npx sequelize db:create');
  shell.exec('npx sequelize db:migrate');
}
