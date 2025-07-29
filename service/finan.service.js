const pool = require('../config/mysql');


/*
async function getAll({idstatus}) {
    console.log(idstatus);
    const [rows] = await pool.query(`SELECT * FROM qryrequisicao where idstatus = ? and datamov > '2025/01/01'`,[idstatus]);
    return rows[0];
}
*/
async function getAll({idstatus,data}) {
    try {
        const [rows] = await pool.query(
            `SELECT datamov AS data_pedido,
            númeroRequisição,
                nomeFornecedor,
                descricaoRequisicaoTipo,
                valorTotalNota
             FROM qryrequisicao
             WHERE idstatus = ? AND datamov > ?`,
            [idstatus,data]
        );
        return rows;
    } catch (error) {
        console.error('Erro ao buscar pedidos não autorizados:', error);
        throw error;
    }

}

async function updateById(id) {

}

module.exports = {
    getAll, updateById
}