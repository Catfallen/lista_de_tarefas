const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

async function registerCliente({ nome, email, senha }) {
    console.log(senha);
    const hashedPassword = await bcrypt.hash(senha, 10);

    const result = await pool.query('insert into clientes (nome,email,senha) values ($1,$2,$3) returning id,email', [nome, email, hashedPassword]
    );

    const cliente = result.rows[0];

    const token = generateToken(cliente.id);

    return { ...cliente, token };
}

async function loginCliente({ email, senha }) {
    const result = await pool.query('SELECT * FROM clientes WHERE email = $1', [email]);
    const cliente = result.rows[0];

    if (!cliente || !(await bcrypt.compare(senha, cliente.senha))) {
        throw new Error('Credenciais inválidas');
    }

    const token = generateToken(cliente.id);
    return { cliente: {id:cliente.id,nome:cliente.nome,email:cliente.email}, token };
}

module.exports = {
    registerCliente, loginCliente
}