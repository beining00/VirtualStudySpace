import React from 'react';

import firebase, {auth} from './Firebase';

function ChatMessage(props) {
    const { text, uid } = props.message;
    console.log(props)
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <p className ="message_p">{text}</p>
      </div>
    </>)
  }

  export default ChatMessage;