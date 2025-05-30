import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import cors from 'cors'
const app= express()
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors());
app.get('',(req,res)=>{
    res.json("welcomeeeeeeeeeeeee")
})

//app.use('/administradores',administradores)

export default app;


