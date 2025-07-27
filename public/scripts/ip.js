//var api_url = 'http://192.168.18.230:3000'
//var api_url = 'http://192.168.18.230:3000'
var api_url = 'https://lista-de-tarefas-gt3z.onrender.com'

window.onload = ()=>{

const register_a = document.getElementById('register_url');
const login_a = document.getElementById('login_url');

if (register_a){
    register_a.addEventListener('click',()=>{
        window.location.href = `${api_url}/todolist/app/register`;
    });
}
if (login_a){
login_a.addEventListener('click',()=>{
    window.location.href = `${api_url}/todolist/app/login`;
})
}
}