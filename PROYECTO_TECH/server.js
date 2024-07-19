const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Conectar a la base de datos SQLite
let db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado a la base de datos SQLite.');
});

// Endpoint para obtener datos de la base de datos
app.get('/productos', (req, res) => {
    const sql = 'SELECT * FROM productos';
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

// Endpoint para agregar un producto (ejemplo)
app.post('/productos', (req, res) => {
    const { nombre, precio } = req.body;
    const sql = 'INSERT INTO productos (nombre, precio) VALUES (?, ?)';
    db.run(sql, [nombre, precio], function(err) {
        if (err) {
            return console.error(err.message);
        }
        res.json({ id: this.lastID });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});