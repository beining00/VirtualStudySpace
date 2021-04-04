import React from 'react';
import Badge from 'react-bootstrap/Badge'

import firebase, {auth} from './Firebase';

function ChatMessage(props) {
    const { text, uid, userName } = props.message;
    console.log(props)
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    
    return (<>

      <div className={`message ${messageClass}`}>
          {" "}
      <Badge pill variant="light">
            {userName}
        </Badge>
        <p className ="message_p">{text}</p>
      </div>
    </>)
  }

  export default ChatMessage;