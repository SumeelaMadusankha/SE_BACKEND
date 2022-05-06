require('dotenv').config();

const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const port = process.env.DB_PORT || '3306';
const password = process.env.DB_PASS || '';
const database = process.env.DB_DB || 'VertualGym' ;

module.exports = {
    host,
    user,
    password,
    database,
    port
}