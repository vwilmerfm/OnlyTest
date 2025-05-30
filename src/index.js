import express from "express"
import app from './app.js'
import { PORT } from './configpuerto.js'
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.js';
import actorRoutes from './routes/actores.js'

import { dbConnection } from './database.js';
dbConnection();


app.use(express.json())
app.use(cors());

app.use('/login', authRoutes);
app.use('/', actorRoutes);

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})

