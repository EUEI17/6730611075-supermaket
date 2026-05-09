const db = require('../models/productModel');


exports.getAllProducts = (req, res) => {
    const sql = "SELECT * FROM products ORDER BY id DESC"; 
    db.query(sql, (err, results) => {
        if (err) {
            console.error("ดึงข้อมูลไม่สำเร็จ: " + err.message);
            return res.status(500).send("Database Error");
        }
        res.render('index', { products: results });
    });
};


exports.addProduct = (req, res) => {
  
    const { name, category, price, stock, image } = req.body;
    const sql = "INSERT INTO products (name, category, price, stock, image) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [name, category, price, stock, image || 'default.jpg'], (err, result) => {
        if (err) {
            console.error("บันทึกข้อมูลไม่สำเร็จ: " + err.message);
            return res.status(500).send(err);
        }
        console.log("บันทึกสินค้าเรียบร้อย!");
        res.redirect('/');
    });
};


exports.deleteProduct = (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM products WHERE id = ?";
    db.query(sql, [id], (err) => {
        if (err) {
            console.error("ลบข้อมูลไม่สำเร็จ: " + err.message);
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
};