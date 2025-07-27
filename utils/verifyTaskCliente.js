const db = require('../config/db');

async function verifyTaskCliente(req,res,next) {
    try{
        console.log("Mid: verifyTaskCliente");
        const clienteId = req.clienteId;
        const id = req.params.id
        const task = await db.query('select * from tasks where id = $1 and id_cliente = $2',[id,clienteId]);
        if(task.rows.length > 0){
            req.clienteId = clienteId;
            req.id = id;
            next();
        }else{
            res.status(404).json({error: 'Tarefa não encontrada ou não pertece ao cliente'});
        }
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = verifyTaskCliente;