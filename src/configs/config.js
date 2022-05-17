require('dotenv').config();

const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const port = process.env.DB_PORT || '3306';
const password = process.env.DB_PASS || '';
const database = process.env.DB_DB || 'VertualGym' ;
const jwtPrivateKey = process.env.JWT_PRIVATEKEY || 'gym_jwtPrivateKey';
module.exports = {
    host,
    user,
    password,
    database,
    port,
    jwtPrivateKey
}