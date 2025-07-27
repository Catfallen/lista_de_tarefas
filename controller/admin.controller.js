const adminService = require('../service/admin.service');

async function postNewCliente(req,res) {
    try{
        console.log(req.body);
        const result = await adminService.registerCliente(req.body);
        //console.log(admin);
        //res.status(201).json(admin);
        res.cookie('token',result.token,{
            httpOnly:true,
            secure:true,
            sameSite: 'Strict',
            maxAge: 36000000
        });

        return res.json({
            mensagem: 'Cliente cadastrado',
            cliente: result.cliente
        });
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

async function loginCliente(req,res) {
    try {
    console.log(req.body);
    const result = await adminService.loginCliente(req.body);
    // Definindo cookie seguro
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: false, // só funciona em HTTPS
      sameSite: 'Strict',
      maxAge: 3600000 // 1 hora
    });
    return res.json({'msg':"Login realizado com sucesso",'cliente':result.cliente});
  } catch (err) {
    console.error('Erro no login controller:', err.message);
    return res.status(401).json({ erro: err.message || 'Erro no login' });
  }
}

module.exports = {
    loginCliente,postNewCliente
}