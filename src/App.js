import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';

// development socket
//const socket = io.connect("http://localhost:3001");

//production socket
const socket = io.connect("https://ern-chat.herokuapp.com");

function App() {
const [name, setName] = useState("");
const [room, setRoom] = useState("");
const [showChat, setShowChat] = useState(false)

const joinRoom = () => {
  if(name !== "" && room !==""){
    socket.emit("join_room", room)
    setShowChat(true)
  }
}

  return (
    <div className = "App">
     
    { !showChat? (
      <div className= "joinChatContainer">

      <h3>Join chat</h3>
      <input 
        type = "text" 
        placeholder = "Your name" 
        onChange = {(e)=>{
          setName(e.target.value)
        }} 
        />
      <input 
        type = "text" 
        placeholder = "Room name" 
        onChange = {(e)=>{
          setRoom(e.target.value)
        }} 
      />
      <button onClick={joinRoom}>Click to join</button>
      </div> ):

      (<Chat socket = {socket} name = {name}  room = {room} />)
    }
    </div>
  );
}

export default App;
