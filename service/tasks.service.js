const db = require('../config/db');

async function getAlltasks(user_id) {
    try {
        const query = `SELECT * FROM tasks WHERE id_cliente = $1 order by id`;
        const values = [user_id.toString()];
        const { rows } = await db.query(query, values);
        return rows;
    } catch (err) {
        console.error('❌ Erro no getAlltasks:', err.message);
        return [];
    }
}

async function insertTask({nome,descricao,prioridade,clienteId,data_conclusao}) {
    const query = `insert into tasks (nome,descricao,prioridade,id_cliente,data_conclusao) values ($1,$2,$3,$4,$5) returning *`;
    const values = [nome,descricao,prioridade,clienteId,data_conclusao];
    console.log(values);
    const {rows} = await db.query(query,values);
    return rows[0];
}

async function deleteTask({id}) {
    const query = `delete from tasks where id = $1`;
    const values = [id];
    const {rows} = await db.query(query,values);
    return rows[0];
}

async function updateTasks({nome,descricao,prioridade,data_conclusao,id}) {
    const query = `update tasks set nome = $1,descricao = $2,prioridade = $3,data_conclusao = $4 where id = $5 returning *`;
    const values = [nome,descricao,prioridade,data_conclusao,id];
    const {rows} = await db.query(query,values);
    return rows[0];
}

async function updateTasksFinish({id,boolean}) {
    console.log(id,boolean);
    const query = `update tasks set concluida = $1 where id = $2 returning *`;
    const values = [boolean,id];
    const {rows} = await db.query(query,values);
    return rows[0];
}

async function onConnect(params) {
    
}

module.exports = {
    getAlltasks,
    insertTask,
    updateTasks,updateTasksFinish,onConnect,
    deleteTask
}