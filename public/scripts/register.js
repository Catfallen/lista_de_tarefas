// ajuste para seu domínio/porta local

document.getElementById('cadastroForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = {
        nome: form.nome.value,
        email: form.email.value,
        senha: form.senha.value
    };

    try {
        const response = await fetch(`${api_url}/admin/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include' // importante para aceitar cookies
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById('msg').style.color = 'green';
            document.getElementById('msg').textContent = 'Cadastro realizado com sucesso!';
            form.reset();
        } else {
            document.getElementById('msg').textContent = result.error || 'Erro ao cadastrar';
        }

    } catch (err) {
        document.getElementById('msg').textContent = 'Erro na requisição';
        console.log(err);
    }
});