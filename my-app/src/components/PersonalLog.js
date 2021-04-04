import React from 'react'
import Card from 'react-bootstrap/Card';
import ChatMessage from './ChatMessage';
function PersonalLog(){

  
    const emoList = ['🔥 ',"🎉 ","👏" ];
    // const messages = [
    //     {
    //         "id" :"system",
    //         'text' : "test text",
    //         'uid' : '1232434142'
            
    //     },
    //     {
    //         "id" :"system",
    //         'text' : "test text",
    //         'uid' : '1232434142'
    //     },
    //     {
    //         "id" :"system",
    //         'text' : "🎉 test text",
    //         'uid' : '1232434142'
    //     },
    //     {
    //         "id" :"system",
    //         'text' : "🎉 test text",
    //         'uid' : '1232434142'
    //     },
    //     {
    //         "id" :"system",
    //         'text' : "🎉 test text",
    //         'uid' : '1232434142'
    //     },

    // ];

    const [messageList, setMessageList] = React.useState([]);

    const dummy = React.useRef();

    const sendMessage =  ()=>{
        const newMessage = {
            "id" :"system",
            'text' : "[Party]test text",
            'uid' : '1232434142'}
        setMessageList([...messageList,newMessage ])
        //e.preventDefault();

        
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }


    
    return (
        <Card.Body>
            {/* <Card.Title>Study Log</Card.Title> */}

            <Card.Text>
       
                    <main className = "chat_main">

                    {messageList.map(msg => <ChatMessage key={msg.id} message={msg} />)}

                    <span ref={dummy}></span>

                    </main>

                    
              
            </Card.Text>
        </Card.Body>
    )
}

export default PersonalLog;