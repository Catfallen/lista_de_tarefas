const form = document.getElementById('loginForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value;
    const senha = form.senha.value;

    try {
        const response = await fetch(`${api_url}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const result = await response.json();
        if (response.ok) {
            msg.style.color = 'green';
            msg.textContent = 'Login realizado com sucesso!';
            // redirecionar ou salvar token
            window.location.href = `${api_url}/todolist/app/dashboard`;
        } else {
            msg.textContent = result.erro || 'Falha no login.';
        }
    } catch (error) {
        msg.textContent = 'Erro de conexão com o servidor.';
    }
});