const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
require('dotenv').config();

const database = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const createDatabase = async () => {
  const connection = await mysql.createConnection({ host, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
  await connection.end();
};

const checkDatabaseExistence = async () => {
  try {
    const connection = await mysql.createConnection({ host, user, password });
    const [rows] = await connection.query(`SHOW DATABASES LIKE '${database}';`);
    await connection.end();
    return rows.length > 0;
  } catch (error) {
    console.error('Error checking database existence:', error);
    throw error;
  }
};

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: process.env.DB_DIALECT || 'mysql'
});

module.exports = { sequelize, createDatabase, checkDatabaseExistence };
