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
        let check_text = "";
        if (item.concluida == null){
            item.concluida = false;
        }
        if(item.concluida){
            check_text = '<i class="fas fa-check-square"></i>'
        }else{
            check_text = '<i class="far fa-square"></i>'
        }
        let div = document.createElement('div');
        div.setAttribute('class', 'tasks-item');

        
        // Conteudo da esquerda
        let left = document.createElement('p');
        let span_name = document.createElement('span');
        span_name.innerHTML = `${item.nome}`;
        left.appendChild(span_name);
        div.appendChild(left);




        //Conteudo da direita icones
        let rigth = document.createElement('p');
        let span_icone = document.createElement('span');
        span_icone.innerHTML = '<i class = "fas fa-trash"></i>';
        span_icone.setAttribute('data-id', item.id);
        span_icone.addEventListener('click', function (event) {
            const id = this.getAttribute('data-id');
            //const id = this.getAttribute('data-id');
            deleteTaskList(id);
        });

        let span_check_icone = document.createElement('span');
        span_check_icone.innerHTML = check_text;
        span_check_icone.setAttribute('put-id',item.id);
        span_check_icone.addEventListener('click',function (event){
            const id = this.getAttribute('put-id');
            updateCheck(id);
        });

        //div.appendChild(span_icone);
        //div.appendChild(span_check_icone);
        rigth.appendChild(span_icone);
        rigth.appendChild(span_check_icone);
        div.appendChild(rigth);
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

async function updateCheck(id) {
    let index = tasks.indexOf(tasks.find(i=> i.id == id));
    let boolean = tasks[index].concluida;
    console.log(boolean);
    if (boolean == null){
        boolean = false;
    }
    if (typeof boolean == 'boolean'){
        boolean = !boolean;
        console.log(boolean);
        const result = await updateTasksFinish(id,boolean);
        console.log(result);
        if(result.id){
            tasks.splice(index,1);
            console.log('deletado com sucesso');
            tasks.push(result);
            tasks.sort((a,b)=>a.id - b.id);
            updateCheckIcon(result.id);
        }else{
            console.log('erro');
        }
    }else{
        console.log('tipo de dado incorreto');
    }
}

function updateCheckIcon(id){
    let domList = [...document.querySelectorAll('span')];
    for(let i = 0;i<domList.length;i++){
        let el = domList[i];
        //return dataid;
        if (domList[i].getAttribute('put-id') == id.toString()){
            let icon = domList[i].getElementsByTagName('i')[0];
            if (icon.getAttribute('class') == 'far fa-square'){
                icon.setAttribute('class','fas fa-check-square');
            }else{
                icon.setAttribute('class','far fa-square');
            }
        }
    }
}

