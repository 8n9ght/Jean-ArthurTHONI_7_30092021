const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE
});

db.connect(err =>{
    if(err){
        throw err
    }
    console.log('DB connected')
});

module.exports = db;