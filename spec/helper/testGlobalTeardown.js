var shell = require('shelljs');

module.exports = () => {
  shell.exec('npx sequelize db:drop');
}
