const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'supermarket_db',
    port: 3306 
});

db.connect((err) => {
    if (err) {
        console.log("-----------------------------------------");
        console.log("พังที่รหัส Error: " + err.code); 
        console.log("ข้อความจากระบบ: " + err.message);
        console.log("-----------------------------------------");
        return;
    }
    console.log("--- เชื่อมต่อได้แล้ว! ---");
});

module.exports = db;