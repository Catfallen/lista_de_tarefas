const express = require('express');
const router = express.Router();
const finanController = require('../controller/finan.controller');
const pool = require('../config/mysql');

router.get('/teste', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT NOW() as agora');
        res.json({ sucesso: true, agora: rows[0].agora });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro ao conectar com o banco de dados.' });
    }
});

router.get('/pedidos/:idstatus/:data',finanController.getAll);

module.exports = router;