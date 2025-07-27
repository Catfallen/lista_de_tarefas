require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const pool = require('./config/db'); // importe o pool

const adminRoutes = require('./routes/admin.routes');
const tasksRoutes = require('./routes/tasks.routes');
const publicRoutes = require('./routes/public.routes');



app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/teste',(req,res)=>{
    res.send('teste');
});


// rota para teste de conexão
app.get('/teste/conn', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Conexão OK', now: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ error: 'Erro na conexão com o banco', details: error.message });
  }
});

app.use(express.static(path.join(__dirname,'public')));
app.use('/todolist/app',publicRoutes);

app.use('/admin',adminRoutes);
app.use('/todolist',tasksRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`http://192.168.18.230:${PORT}`);
})