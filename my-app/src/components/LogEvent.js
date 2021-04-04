import firebase, {auth} from './Firebase';

function LogEvent(receiverUid,messageType, messageContent ){
    firebase.database().ref('personalLog/' + receiverUid).push(
        {
            type: messageType,
            value: messageContent,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        })


}

export default LogEvent; 