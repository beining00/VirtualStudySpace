import React from 'react';
import Card from 'react-bootstrap/Card';
import ChatMessage from './ChatMessage';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import 'firebase/firestore';
import firebase, {auth} from './Firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import _ from 'lodash';
import { max } from 'moment';


//const firestore = firebase.firestore();
const maxMessage = 30;
function ChatRoom(props){



    const canChat = props.canChat;
  
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

    

    const messagesRef = firebase.firestore().collection('messages');
    const query = messagesRef.orderBy("createdAt");

    
    
    const [messages] = useCollectionData(query, { idField: 'id' });
   
    const dummy = React.useRef();
    React.useEffect(()=>{
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    },[])
    const [formValue, setFormValue] = React.useState('');

    const sendMessage = async (e)=>{
        // const newMessage = {
        //     "id" :"system",
        //     'text' : "[Party]test text",
        //     'uid' : '1232434142'}
        // setMessageList([...messageList,newMessage ])
        e.preventDefault();

        const { uid } = auth.currentUser;
        
        // get the current user name 
        // if (uid != ""){
        //     firebase.database().ref().child("globalUserStatus/users").child(uid).get().then(function(snapshot) {
        //         if (snapshot.exists()) {
                  
                    
        //             setName(snapshot.val().UserName)
        //             setGoal(snapshot.val().UserStatus)
        //         }
        //         else {
        //         console.log("No data available");
        //         }
        //     }).catch(function(error) {
        //         console.error(error);
        //     });

        // }

        //const userName = await firebase.database().ref().child("globalUserStatus/users").child(uid).get().val().UserName;
        

    
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            userName : props.senderName
            })
        // delte olde message 
        if (messages.length >= maxMessage){
            const numToDelete = messages.length - maxMessage + 1
            for (let i =0; i<numToDelete;i++){
                console.log(messages[i].id)
                messagesRef.doc(messages[i].id).delete().then(() => {
                    console.log("Document successfully deleted!");
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
            }
        }
    
        

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
                    

                   
                    {canChat && (
                        <form className = "chat_form" onSubmit={sendMessage}>

                        <input className = "chat_input" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
    
                        <button className = "chat_button" type="submit" disabled={!formValue}>send</button>
    
                        </form>
                    )
                    }
                    
                        
                  

                    
              
            </Card.Text>
        </Card.Body>
    )
}

export default ChatRoom;