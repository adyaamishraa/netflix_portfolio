import React from 'react'
import './AdminProf.css'
import chatbg from '../assets/chatb.jpg'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { API_URL } from '../api';

const AdminProf = () => {


  const [techInputBox, setTechInputBox] = useState('');

  const [techMsgs, setTechMsgs] = useState([]);

  const [isTypingIndicator, setIsTypingIndicator] = useState(false);


  const sendDataToBackend = async() => {

    if(!techInputBox.trim()){
      return 
    }

    const usermsgs = {sender: "user", textHeSent: techInputBox};
    setTechMsgs(prev => [...prev, usermsgs]);

    setTechInputBox('');
    setIsTypingIndicator(true);

    try {

      const response = await fetch(`${API_URL}/techbot`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          message: techInputBox
        })
      })

      const result = await response.json()
      console.log(result);

      setTimeout(() => {

        const botmsgs = {sender: 'bot', textBotSent: result.reply};
        setTechMsgs(prev => [...prev, botmsgs]);
        setIsTypingIndicator(false);

      }, 1000)
      

      
    } 
    catch (error) {
      
      console.error(error.message);
      
    }
    
  }


  const bottomRef = useRef(null);
   
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [techMsgs])



  return (
    <>
    <div className='tech-container'>
      
      <nav className='tech-nav'>
        <h1 className='tech-nav-heading'>Tech Stack</h1>
      </nav>

      <img src={chatbg} alt="bg" className='tech-bg-img'/>


      <div className="tech-msg-container">

        {
          techMsgs.map((techMsg, index) => (
            <div key={index} className = {`messages ${techMsg.sender === 'user' ? 'tech-user-msg' : 'tech-bot-msg'}`}>
              <span>{techMsg.textBotSent || techMsg.textHeSent}</span>
            </div>
          ))
        }

        {
          isTypingIndicator && (
            <div className='messages tech-bot-msg'>
              <span>Typing...</span>
            </div>
          )
        }

        <div ref={bottomRef}></div>

      </div>



      <div className='tech-input-container'>
          <input type="text" className='tech-input-box' placeholder='Ask anything' value={techInputBox} onChange={(e) => setTechInputBox(e.target.value)}/>
          <span className="material-symbols-outlined tech-send-btn" onClick={sendDataToBackend}>arrow_upward</span>
      </div>
    </div>
    </>
  )
}

export default AdminProf