import { useState } from "react";

function SQLGenerator(){
    const [query, setQuery] = useState([])
    const [queryMessage, setQueryMessage] = useState("")

    const getQueries = async ()=>{
        const options = {
            method : "POST",
            body: JSON.stringify({
                message: queryMessage,
            }),
            headers : {
              "Content-Type" : "application/json"
          }
        }
        try {
            const response = await fetch('http://localhost:8000/completionsql',options)
            const data = await response.json()
            setQuery(oldData => ([...oldData, data]))
        } catch (error) {
            console.error(error)
        }
    }

    const clearChat = ()=>{
        setQueryMessage("")
        setQuery([])
    }

    return (
        <div className='sql-gen'>
            <h1>Write a SQL Query</h1>
            <div className="query-input-container">
                <input value={queryMessage} onChange={(e)=>setQueryMessage(e.target.value)}/>
                <button className="get-queries" onClick={getQueries}>Get queries</button>
                <button className="clear-chat" onClick={clearChat}>Clear Chat</button>
            </div>
            <div className="displayQueries">
                {query.map((message,index)=> <p key={index}>{message.content}</p>)}
            </div>
        </div>
    )
}

export default SQLGenerator;