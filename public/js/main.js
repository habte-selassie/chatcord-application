const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

////////// get username and room from url

const { username,room}  = qs.parse(location.search,{
  ignoreQueryPrefix:true
})


console.log(username,room);


const socket = io()

////////////// Join the Chatroom
socket.emit('joinRoom',{username,room })

/// Get Room and A users
socket.on('roomUsers',({room,users})=>{
  outputRoomName(room)
  outputUsers(users)
})
/////////// message fro server
socket.on('message',message=>{
  console.log(message);
  outputMessage(message)



  /// scrolled don
  chatMessages.scrollTop = chatMessages.scrollHeight
})

//////////// message submit 
chatForm.addEventListener('submit',(e)=>{
  e.preventDefault()

///////// Get Message Texts
  const msg = e.target.msg.value


////////////// emitng messag to a server
  socket.emit('chatMessage',msg)


  /////// Clear input
  e.target.msg.value = ''
  e.target.msg.focus()

})

////////// Output message to a don
function outputMessage(message){
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `<p class="meta">${message.username} <span> ${message.time}</span></p>
  <p class="text">
  ${message.text}               
  </p>
</div>`

document.querySelector('.chat-messages').appendChild(div)
}
////////////// Add room name to DOM
function outputRoomName(room){
roomName.innerText = room
}


///////// Add Users don
function outputUsers(users){

 userList.innerHTML = `
 ${users.map(user=>`<li>${user.username}</li>`).join('')}
  `
}