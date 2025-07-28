const express = require('express');
const router = express.Router();

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

module.exports = router;