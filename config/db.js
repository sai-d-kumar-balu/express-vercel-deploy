const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

//mysql -h shortline.proxy.rlwy.net -u root -p ukkuzwOcaMLUwIxmmUHczuvlDUOcZvkK --port 31561 --protocol=TCP railway
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

module.exports = connection;