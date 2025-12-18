import React, { useRef } from 'react'
import './KnowYourAdmin.css'
import chatbg from '../assets/chatb.jpg'
import { useState } from 'react'
import { useEffect } from 'react'
import { data } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL;

const KnowYourAdmin = () => {

    const [input, setInput] = useState(''); // Jo input me type karenge.
    const [messages, setMessages] = useState([]); // messages humara arr me send hoga [sender: "name" , textHeSent: "msg"], user & bot dono ka isme store hoga.
    const [isTyping, setIsTyping] = useState(false); // typing indicator

    
    const sendingData = async() => {
        if(!input.trim()) return;   // Prevent empty messages

        const usermsg = {sender: "user", textHeSent: input};  // Create a message object, Mark sender as "user", Store what user typed (only for UI display, not backend.)
        setMessages(prev => [...prev, usermsg]);   // takes old msg , add new user msg at end , updates UI immediately.

        setInput('');
        setIsTyping(true);

        try {

            const response = await fetch(`${API_URL}/chatbot`, {
                method: 'POST',
                // credentials: 'include',   // we write this when we use cookies
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({message: input})  // taki input match ho sake keyword se.
            })

            const result = await response.json();
            console.log(result);

            

            setTimeout(() => {

                const botmsg = {sender: 'bot', textBotSent: result.reply};
                setMessages(prev => [...prev, botmsg]);
                setIsTyping(false);

            }, 1000)
        
        } 
        catch (error) {

            console.error(error.message);
            
        }
    }




    const bottomref = useRef(null); // A finger pointing to the last message

    useEffect(() => {
        bottomref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    //Whenever messages updates , Scroll smoothly to the bottom marker

   
    

  return (
    <>
    <div className='chatb-container'>
        <nav className='navbar'>
            <h1 className='nav-head'>Know Your Admin</h1>
        </nav>

        <img src={chatbg} alt="bg" className='bg-img' />

       
        <div className='msg-container'>
            {
                messages.map((msg,index) => (
                    <div key={index} className= {`message ${msg.sender === 'user' ? 'user-msg' : 'bot-msg'}`}>
                        <span>{msg.textBotSent || msg.textHeSent}</span>  {/* Show textBotSent if it exists, otherwise show textHeSent */}
                    </div>
                ))
            }

            {
                isTyping && (
                    <div className='message bot-msg'>
                        <span>Typing...</span>
                    </div>
                )
            }

            <div ref={bottomref}></div> {/* invisible marker */}
        </div>
      

        {/* 
            messages = [
                { sender: 'user', textHeSent: 'Hi' },  -> msg
                { sender: 'bot', textBotSent: 'Hello!' }   ->msg
            ]
        */}

        <div className='input-container'>
            <input type="text" className='input-box' placeholder='Ask anything' value={input} onChange={(e) => setInput(e.target.value)}/>
            <span className="material-symbols-outlined send-btn" onClick={sendingData}>arrow_upward</span>
        </div>
    </div>
    </>
  )
}

export default KnowYourAdmin