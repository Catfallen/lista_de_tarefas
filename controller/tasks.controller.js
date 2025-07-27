const tasksServices = require('../service/tasks.service');

async function getAlltasks(req,res) {
    try{
        const clienteId = req.clienteId;
        const result = await tasksServices.getAlltasks(clienteId);
        res.status(201).json(result);
    }catch(err){
        res.status(404).json({erro:err.message});
    }
}

async function postTask(req,res) {
    try{
        const clienteId = req.clienteId;
        const {nome,descricao,prioridade,data_conclusao} = req.body;
        
        const result = await tasksServices.insertTask({nome,descricao,prioridade,clienteId:clienteId,data_conclusao});
        res.status(200).json(result);
    }catch (err){
        res.status(500).json({erro:err.message});
    }
}

async function deleteTask(req,res) {
    try{
        const clienteId = req.clienteId;
        const id = req.id;
        const result = await tasksServices.deleteTask({clienteId,id});
        res.status(200).json({message: 'deletado com sucesso'});
    }catch (err){
        res.status(500).json({erro:err.message});
    }
}

async function updateTasks(req,res) {
    try{
        const id = req.id;
        const {nome,descricao,prioridade,data_conclusao} = req.body;
        const result = await tasksServices.updateTasks({nome,descricao,prioridade,data_conclusao,id:id});
        res.status(200).json({'message':'atualizado com sucesso', 'task':result});
    }catch (err){
        res.status(500).json({erro:err.message});
    }
}

async function updateTasksFinish(req,res) {
    try{
        const id = req.id;
        const {boolean} = req.body;
        const result = await tasksServices.updateTasksFinish({id,boolean})
        //res.status(200).json({'msg':'atualizado com sucesso','result':result})
        res.status(200).json(result);
    }catch (err){
        res.status(500).json({erro:err.message});
    }
}

module.exports = {
    getAlltasks,
    postTask,
    updateTasks,updateTasksFinish,
    deleteTask
}
