const pool = require('../config/mysql');

async function getAll({idstatus}) {
    console.log(idstatus);
    const [rows] = await pool.query(`SELECT * FROM qryrequisicao where idstatus = ? and datamov > '2025/01/01'`,[idstatus]);
    return rows;
}

async function updateById(id) {

}

module.exports = {
    getAll,updateById
}