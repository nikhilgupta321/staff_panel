const fs = require("fs")
const { Sequelize } = require('sequelize');
require("dotenv").config();

const cwd = __dirname.split("/");
const rootDir = cwd.slice(0, cwd.length - 1).join("/");

const assetsDir = process.env.ASSETS_DIR;
const port = process.env.PORT;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const jwtSecret = process.env.JWT_SECRET;

const imagesDir = assetsDir + "/images";


const config = {
  jwtSecret: jwtSecret,
  port: port,
  rootDir: rootDir,
  assetsDir: assetsDir,
  imagesDir: imagesDir,
}

const sequelize = new Sequelize({

  dialect: 'mysql',
  host: '68.178.171.26',
  username: dbUser,
  password: dbPass,
  database: dbName,
  timezone: "+05:30",
 

});

module.exports = {sequelize,config};