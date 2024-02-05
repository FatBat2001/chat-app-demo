
import { io } from "socket.io-client";
const messageInput = document.getElementById('message-input'); 
const messageButton = document.getElementById('message-button'); 
const roomInput = document.getElementById('room-input'); 
const roomButton = document.getElementById('room-button'); 

const socket = io('http://localhost:3000'); 
socket.on("connect", () => {
  console.log(`connected with id: ${socket.id}`);
  displayMessage(`connected with id: ${socket.id}`); 
}); 

socket.on('receive-message', message => { 
  displayMessage(message); 
})
messageButton.addEventListener('click', (e) => {
  e.preventDefault(); 
  const message = messageInput.value;
  const room = roomInput.value; 
  if (message === "") return;
  displayMessage(message);
  socket.emit('send-message', message, room); 
  messageInput.value = ""; 
})
roomButton.addEventListener('click', (e) => {
  e.preventDefault(); 
  const room = roomInput.value; 
  if (room === "") return;
  socket.emit('join-room', room, (message) => {
    displayMessage(message); 
  });
})
function displayMessage(message) {
  const chatDiv = document.getElementById('chat');
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  chatDiv.appendChild(messageElement);
}