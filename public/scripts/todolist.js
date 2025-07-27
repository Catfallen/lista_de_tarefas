const tasks_div = document.getElementById('tasks');
const btn = document.getElementById('btn');
const task_name = document.getElementById('task_name');

var carregando = false;

class Loading{
    #loading; //campo privado
    constructor(){
        this.#loading = false;
    }

    get loading(){
        return this.#loading;
    }

    set loading(value){
        if (typeof value !== 'boolean'){
            throw new TypeError('O valor de loading dever ser um booleano');
        }
        this.#loading = value;
    }
}



const loading_insert = new Loading();
const loading_delete = new Loading();

btn.addEventListener('click', async () => {
    if (!loading_insert.loading) {
        loading_insert.loading = true;
        btn.innerText = 'inserindo...'
        let result = await insertTask(task_name.value, "", "", "2025-08-01");
        if (result.id) {
            tasks.push(result);
            console.log("inserido com sucesso: ");
            console.log(result);
            getTasks();
        }
        loading_insert.loading = false;
        btn.innerText = 'inserir';
    }
});

window.onload = () => {
    getAllTasks();
}

function getTasks() {
    let keys = Object.keys(tasks);
    tasks_div.innerHTML = "";
    for (let key = 0; key < keys.length; key++) {
        let item = tasks[key];
        let div = document.createElement('div');
        div.setAttribute('class', 'tasks-item');

        let span_name = document.createElement('span');
        span_name.innerHTML = `${item.nome}`
        div.appendChild(span_name);

        let span_icone = document.createElement('span');
        span_icone.innerHTML = '<i class="far fa-trash-alt delete"></i>'
        span_icone.setAttribute('data-id', item.id);
        span_icone.addEventListener('click', function (event) {
            const id = this.getAttribute('data-id');
            //const id = this.getAttribute('data-id');
            deleteTaskList(id);
        })
        div.appendChild(span_icone)
        tasks_div.appendChild(div);
    }
}

async function deleteTaskList(id) {
    let result = await deleteTask(id);
    if (result.message) {
        let index = tasks.indexOf(tasks.find(i => i.id == id));
        console.log(index);
        if (index !== -1) {
            tasks.splice(index, 1);
        }
        console.log(result.message);
        getTasks();
    }
}