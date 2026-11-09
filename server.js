require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public'));
app.set('view engine', 'ejs');

// Conexión a la base de datos con pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.render('index'); // Renderiza el archivo views/index.ejs
});

// GET: Listar todos los productos
app.get('/api/productos', async (req, res) => {
  try {
    const [filas] = await pool.execute('SELECT * FROM productos WHERE activo = 1');
    res.json(filas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// GET: Obtener un producto por ID
app.get('/api/productos/:id', async (req, res) => {
  try {
    const [filas] = await pool.execute(
      'SELECT * FROM productos WHERE id = ? AND activo = 1',
      [req.params.id]
    );
    if (filas.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(filas[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar producto' });
  }
});

// POST: Crear un producto
app.post('/api/productos', async (req, res) => {
  try {
    const { nombre, categoria, precio, stock } = req.body;

    if (!nombre || !categoria || !precio) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const [resultado] = await pool.execute(
      'INSERT INTO productos (nombre, categoria, precio, stock) VALUES (?, ?, ?, ?)',
      [nombre, categoria, precio, stock || 0]
    );

    res.status(201).json({
      id: resultado.insertId,
      nombre,
      categoria,
      precio,
      stock: stock || 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// PUT: Actualizar un producto
app.put('/api/productos/:id', async (req, res) => {
  try {
    const { nombre, categoria, precio, stock } = req.body;

    const [existente] = await pool.execute(
      'SELECT id FROM productos WHERE id = ? AND activo = 1',
      [req.params.id]
    );

    if (existente.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await pool.execute(
      'UPDATE productos SET nombre = ?, categoria = ?, precio = ?, stock = ? WHERE id = ?',
      [nombre, categoria, precio, stock, req.params.id]
    );

    res.json({ mensaje: 'Producto actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar' });
  }
});

// DELETE: Eliminar (lógicamente) un producto
app.delete('/api/productos/:id', async (req, res) => {
  try {
    const [existente] = await pool.execute(
      'SELECT id FROM productos WHERE id = ? AND activo = 1',
      [req.params.id]
    );

    if (existente.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await pool.execute('UPDATE productos SET activo = 0 WHERE id = ?', [req.params.id]);
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
});

// Iniciar el servidor
const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});