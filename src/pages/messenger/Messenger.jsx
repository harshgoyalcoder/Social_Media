import React, { useContext, useEffect, useRef, useState } from 'react'
import Topbar from '../../components/Topbar/Topbar'
import Conversation from '../../components/conversations/conversations';
import Message from '../../components/message/message';
import ChatOnline from '../../components/chatOnline/chatOnline';
import axios from "axios"
import {io} from "socket.io-client";
import './messenger.css';
import { AuthContext } from '../../context/AuthContext';
export default function Messenger() {
   
  const [conversations,setConversations]=useState([]);
  const [currentChat,setCurrentChat]=useState(null);
  const [messages,setMessages]=useState([]);
  const [newMessage,setNewMessage]=useState([]);
  const [arrivalMessage,setArrivalMessage]=useState(null);
  const [onlineUsers,setOnlineUsers]=useState([]);
  // const [socket,setSocket]=useState(null);
  const socket =useRef();
  const {user} =useContext(AuthContext);
  const scrollRef =useRef();

useEffect(()=>{
  socket.current=io("https://connectchat.onrender.com");
  socket.current.on("getMessage",(data)=>{
    setArrivalMessage({
      sender:data.senderId,
      text:data.text,
      createdAt:Date.now(),

    })
  })
},[]);
useEffect(() => {
  arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)&& setMessages((prev)=>[...prev,arrivalMessage]);

  
}, [arrivalMessage,currentChat])


useEffect(()=>{
  socket.current.emit("addUser",user._id);
  socket.current.on("getUsers",(users)=>{
    // console.log(users);
    setOnlineUsers(
      user.following.filter((f)=>users.some((u)=>u.userId===f))
    );
  });
},[user])

// console.log(socket)
// useEffect(()=>{
//   socket?.on("Welcome",message=>{
//     console.log(message)
//   })
// },[socket])  

  useEffect(()=>{
    const getConversations= async()=>{

      try{
        const res = await axios.get("/conversation/"+user._id);

        setConversations(res.data);
        // console.log(res.data)
      }catch(err){
        console.log("err");
      }
      };
    getConversations();
  },[user._id]);
 
   useEffect(()=>{
    const getMessages=async()=>{
      try{
        const res=await axios.get("/message/"+currentChat?._id);
        setMessages(res.data);
      }catch(err){
        console.log(err);
      }

    }
    getMessages();
   },[currentChat]);
 
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const message={
      sender:user._id,
      text:newMessage,
      conversationId:currentChat._id
    };


    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res=await axios.post("/message",message);
      setMessages([...messages,res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior:"smooth"});
  }, [messages]);
  

  return ( 
    
    <>
    <Topbar/>

    <div className="messenger">

      <div className="chatMenu">
        <div>
          <input placeholder='Search For Friends'/>
         {conversations.map((c)=>(
          <div onClick={()=>setCurrentChat(c)}>
            <Conversation  conversation={c} currentUser={user}/>
          </div>

         ))}
        </div>
      </div>
      <div className="chatBox">
       <div>
          {currentChat?
          (
            <>
            <div>
              {messages.map((m)=>(
               <div ref={scrollRef}>
                 <Message message={m} own={m.sender===user._id}/>
               </div>
              ))}
          
            </div>
            <div>
              <textarea placeholder='write something...' onChange={(e)=>setNewMessage(e.target.value)} value={newMessage}></textarea>
              <button onClick={handleSubmit}>Send</button>
            </div>
            </>
          ):(

            <span  className='noConversation'>Open A Conversation to start a Chat</span>
          )}
         

       </div>
      </div>
      <div className="chatOnline">
        <div>
          {/* <ChatOnline
            onlineUsers={onlineUsers}
            currentId={user._id}
            setCurrentChat={setCurrentChat}

          /> */}
          <ChatOnline 
          onlineUsers={onlineUsers}
          currentId={user._id}
          setCurrentChat={setCurrentChat}
           />
         
          
        </div>
      </div>
    </div>


    </>
    )
}
