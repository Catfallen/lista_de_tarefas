require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');


const adminRoutes = require('./routes/admin.routes');
const tasksRoutes = require('./routes/tasks.routes');
const publicRoutes = require('./routes/public.routes');



app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/teste',(req,res)=>{
    res.send('teste');
});

app.use(express.static(path.join(__dirname,'public')));
app.use('/todolist/app',publicRoutes);

app.use('/admin',adminRoutes);
app.use('/todolist',tasksRoutes);

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`http://192.168.18.230:${PORT}`);
})