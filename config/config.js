const dotenv = require('dotenv');
dotenv.config();

var config {
  "development": {
    "username": process.env.DV_USERNAME,
    "password": null,
    "database": "quantified_self_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DV_USERNAME,
    "password": null,
    "database": "quantified_self_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "database": "quantified_self_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}

module.exports = config;
