import React from 'react';
import Card from 'react-bootstrap/Card';
import ChatMessage from './ChatMessage';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import 'firebase/firestore';
import firebase, {auth} from './Firebase';
import {useAuthState} from 'react-firebase-hooks/auth';

//const firestore = firebase.firestore();

function ChatRoom(){

    //const canChat = props.canChat;
  
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
    const messagesRef = firebase.firestore().collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
  
    const [messages] = useCollectionData(query, { idField: 'id' });

    const dummy = React.useRef();
    const [formValue, setFormValue] = React.useState('');

    const sendMessage = async (e)=>{
        // const newMessage = {
        //     "id" :"system",
        //     'text' : "[Party]test text",
        //     'uid' : '1232434142'}
        // setMessageList([...messageList,newMessage ])
        e.preventDefault();

        const { uid } = auth.currentUser;
    
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            userName : "Dummy userName"
            })

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    // console.log("canChat is " + canChat)

    // const padding_bottom = canChat? "4px" : "0px";
    
    return (
        <Card.Body>
            {/* <Card.Title>Study Log</Card.Title> */}

            <Card.Text>
       
                    <main className = "chat_main" style= {{'padding-bottom':"4px"}}>

                    {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

                    <span ref={dummy}></span>

                    </main>

                   

                    <form className = "chat_form" onSubmit={sendMessage}>

                    <input className = "chat_input" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

                    <button className = "chat_button" type="submit" disabled={!formValue}>🕊️</button>

                    </form>
                        
                  

                    
              
            </Card.Text>
        </Card.Body>
    )
}

export default ChatRoom;