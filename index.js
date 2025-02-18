const express=require('express');
const app=express();
const path=require('path')
const http=require('http');   //http is a preinstalled package in node
const server=http.createServer(app);
const socketio=require('socket.io');
const io=new socketio.Server(server);

const users={};

io.on('connection',(socket)=>{
    //console.log("user connected !!!")
    socket.on('send-msg',(data)=>{

    io.emit('received-msg',{

        id:socket.id,
        msg:data.msg,
        username:users[socket.id]

     })
 })
   
 socket.on('login',(data)=>{
  users[socket.id]=data.username;
 })



});
app.use('/', express.static(path.join(__dirname,'public')))
const PORT=process.env.PORT || 4444;

server.listen(PORT,()=>{
    console.log(`server is up at port ${PORT}`)
})
