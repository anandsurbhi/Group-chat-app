const socket=io();
document.querySelectorAll('.chatcontainer')[1].style.display = 'none';

const inputbox=document.querySelector('.input-box');
const sendbutton=document.querySelector('.send-btn');
const chat=document.querySelector('.chat');

sendbutton.addEventListener('click',()=>{
    const textmessage=inputbox.value;
    inputbox.value='';
  

    socket.emit('send-msg',{msg:textmessage});

});

socket.on('received-msg',(data) =>{
     
        const div = document.createElement('div');

        if(data.id===socket.id){
            div.classList.add('message','sender');
        }else{
            div.classList.add('message','receiver');
        }
        div.innerHTML = `<strong>${data.username}</strong> - <span>${data.msg}</span>`
    chat.append(div);
});

const loginname=document.querySelector('#login-name');
const loginbtn=document.querySelector('#login-btn');

loginbtn.addEventListener('click',()=>{
    const username=loginname.value;
    loginname.value='';

    if(username===''){
        return;
    }

    socket.emit('login',{username});
    document.querySelectorAll('.chatcontainer')[0].style.display = 'none';
    document.querySelectorAll('.chatcontainer')[1].style.display = 'block';


})