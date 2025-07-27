const express = require('express');
const router = express.Router();
const tasksController = require('../controller/tasks.controller');
const verifyToken = require('../utils/verifyToken');
const verifyTaskCliente = require('../utils/verifyTaskCliente');

router.get('/getAll',verifyToken,tasksController.getAlltasks);

router.post('/insert',verifyToken,tasksController.postTask);

router.put('/update/:id',verifyToken,verifyTaskCliente,tasksController.updateTasks);
router.put('/update/finish/:id',verifyToken,verifyTaskCliente,tasksController.updateTasksFinish);

router.delete('/delete/:id',verifyToken,verifyTaskCliente,tasksController.deleteTask);

module.exports = router;