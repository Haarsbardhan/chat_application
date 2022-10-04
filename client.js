const socket = io()
let Name;
let textarea = document.querySelector('#textarea')

let messageArea= document.querySelector('.message__area')
do{
    Name=prompt('Please enter your name: ')
}while(!Name)

textarea.addEventListener('keyup',(a)=>{
    if(a.key === 'Enter'){
        sendMessage(a.target.value)
    }

})
function sendMessage(message){
    let msg={ 
        user: Name,
        message: message.trim()
    }
    //Message Append
    appendMessage(msg,'outgoing')
    textarea.value=''
    scrollToBottom()


    //Send to server
    socket.emit('message',msg)
}
function appendMessage(msg,type){
    let mainDiv=document.createElement('div')
    let className=type
    mainDiv.classList.add(className,'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)

}

//Recieve message
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()  //to auto scroll

})
function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}