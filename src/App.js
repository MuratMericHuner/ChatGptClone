import { useEffect, useState } from "react";

function App() {

  const [question, setQuestion] = useState(null)
  const [message, setMessage] = useState(null)
  const [previousChat, setChat] = useState([])
  const [chatTitle, setChatTitle] = useState([])

  const getMessages = async ()=>{
    const options = {
      method : "POST",
      body: JSON.stringify({
          message: question,
      }),
      headers : {
        "Content-Type" : "application/json"
    }
  }
    try {
      const response = await fetch('http://localhost:8000/completion',options)
      const data = await response.json()
      setMessage(data)
    } catch (error) {
      console.error(error)
    }
  }

  const newChat=() =>{
    setMessage(null)
    setQuestion("")
    setChatTitle(null)  
  }

  const handleClick= (title) =>{
    setChatTitle(title)
    setMessage(null)
    setQuestion("")
  }

  useEffect(()=>{
    if(!chatTitle && question && message){
      setChatTitle(question)
    }
    if(chatTitle && question && message){
      setChat(prevChat => ([...prevChat, {
          title : chatTitle,
          role : 'user',
          content : question
      },{
          title: chatTitle,
          role: message.role,
          content:message.content
      }]))
    }
  },[message,chatTitle])

  const currentChat = previousChat.filter(previousChat => previousChat.title===chatTitle)
  const uniqueTitle = Array.from(new Set(previousChat.map(previousChat=> previousChat.title)))

  return (
    <div className="Chat">
      <section className="sidebar">
        <button className="add-button" onClick={newChat}>+ New Chat</button>
        <ul className="history">
        {uniqueTitle?.map((title,index) => <li key={index} onClick={()=>handleClick(title)}>{title}</li>)}
        </ul>
      </section>
      <section className="main-chat">
          <ul className="feed">
            {currentChat.map((chat,index) => <li key={index}>
              <p className="role">{chat.role}</p>
              <p>{chat.content}</p>
              </li>)}
          </ul>
          <div className="bottom">
              <div className="input-container">
                 <input value={question} onChange={(e)=>{setQuestion(e.target.value)}}/>
                 <div id="submit" onClick={getMessages}>➤</div>
              </div>
          </div>
      </section>
    </div>
  );
}

export default App;
