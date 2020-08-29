const express = require('express');
const app = express();
const dotenv=require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
mongoose.connect(process.env.DB_CONECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, },()=>console.log('connected to database'))

app.use(express.json())

const phonebook = require('./routers/phonebook');

app.use('/api/phonebook', phonebook);

app.listen(3000, ()=> console.log('Server is  running'));
//console.log('node is running');