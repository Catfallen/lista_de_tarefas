//const { post } = require("../../routes/tasks.routes");

var tasks;
async function getAllTasks() {
    try{
        const response = await fetch(`${api_url}/todolist/getAll`,{
            method: 'get',credentials: 'include'
        });
        tasks = await response.json();
        console.log(tasks);
        getTasks();
    }catch (err){
        console.log(err)
    }
}

async function deleteTask(id) {
    try{
        const response = await fetch(`${api_url}/todolist/delete/${id}`,{
            method:'delete',credentials:"include"
        });
        let result = await response.json();
        return result;
    }catch(err){
        console.log(err);
        return false;
    }
}

async function insertTask(nome,descricao,prioridade,data_conclusao) {
    try{
        const response = await fetch(`${api_url}/todolist/insert`,{
            method:'post',credentials:'include',headers:{
                'Content-Type':'application/json'
            },body: JSON.stringify({
                nome:nome,descricao:descricao,prioridade:prioridade,data_conclusao:data_conclusao
            })
        });
        let result = await response.json();
        console.log(result);
        return result;
    }catch(err){
        console.log(err);
        return false
    }
}

async function updateTask(id,nome,descricao,prioridade,data_conclusao) {
    try{
        const response = await fetch(`${api_url}/todolist/update/${id}`,{
            'method':'put',credentials:'include',headers:{
                'Content-Type':"Application/json"
            },body: JSON.stringify({
                nome:nome,descricao:descricao,prioridade:prioridade,data_conclusao:data_conclusao
            })
        })
        let result = await response.json();
        console.log(result);
    }catch(err){
        console.log(err)
    }
}

async function updateTasksFinish(id,value) {
    try{
        console.log(`Valores enviados: ${id} - ${value}`);
        const response = await fetch(`${api_url}/todolist/update/finish/${id}`,{
            method:'put',credentials: 'include',headers:{
                'Content-Type': 'Application/json'
            },body: JSON.stringify({
                'boolean':value
            })
        });
        const result = await response.json();
        return result;
    }catch(err){
        console.log(err);
        return false
    }
}



