const express=require('express')
const app=express()
const dotenv=require('dotenv')
require('./db/db.config')
const chatRoute=require('./Routes/chatRoute')
const userRoute=require('./Routes/userRoute')
const { Server } = require('socket.io')
import cors from 'cors'
import { createChat } from './Controller/chatController'

import { getUserBySocketId, updateSocketId } from './Controller/userController'

dotenv.config()

const port=process.env.PORT
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',userRoute)
app.use('/',chatRoute)

const server =app.listen(5000,console.log("running"))

const io = new Server(server, {
    cors: {
        origin: '*'
        // method: ['POST', 'GET']
    }
})

io.on('connection',(socket)=>{
    console.log("new connection",socket.id)

    socket.on('create-connection',(userId)=>{
       updateSocketId(userId,socket.id) 
       io.to(socket.id).emit('connection-success', socket.id);
    })


    socket.on("create-chat",async(socketdata)=>
    {
        console.log("this is socketdata", socketdata)
    
       await createChat({...socketdata}).then((res)=>{
        console.log('this is response',res)
       }).catch((err) => {
        console.log(err)
       })
    })
})