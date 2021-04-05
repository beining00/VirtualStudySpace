import React from 'react';
import Badge from 'react-bootstrap/Badge'
import Row from 'react-bootstrap/Row';
import {MdShare} from "react-icons/md";


import firebase, {auth} from './Firebase';

function ChatMessage(props) {
    const { text, uid, userName } = props.message;
    console.log(text)
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    
    
    return (<>
    
     
      <div className={`message ${messageClass}`}>
        {/* <Row>
            <div className="chat_username"><Badge pill variant="light">
            {userName}
        </Badge></div>
        </Row>
        <Row> */}
        <Badge pill variant="light">
            {userName}
        </Badge>
        <div class="break"></div>
        {/* <img src={botLogo}/> */}
        <p className ="message_p">
            {text}</p>
  
        
      </div>
    </>)
  }

  export default ChatMessage;