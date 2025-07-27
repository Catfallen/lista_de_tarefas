const bcrypt = require('bcryptjs');

let s = '123'

async function register(senha) {
    const hashedPassword = await bcrypt.hash(senha, 10);
    console.log(hashedPassword.toString());
}

register(s);

