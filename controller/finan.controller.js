const finanService = require('../service/finan.service');

async function getAll(req,res) {
    try{
        const {idstatus} = req.params;
        console.log(idstatus);
        const result = await finanService.getAll({idstatus});
        res.status(200).json(result);
    }catch (err){
        res.status(500).json({'error':err});
    }

}

async function autorizarPedido(req,res) {
    try{
        const id = req.params.id;
    }catch (err){
        res.status(500).json({'error':err});
    }
}


module.exports = {
    getAll
}