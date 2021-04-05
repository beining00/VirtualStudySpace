import firebase, {auth} from './Firebase';

function LogEvent(receiverUid,messageType, messageContent ){
    firebase.database().ref('personalLog/' + receiverUid).push(
        {
            type: messageType,
            value: messageContent,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        })


}


function changeFriendList(isAdd, receiverUid,myId){
    if (isAdd){
        firebase.database().ref('globalUserStatus/userFriends/' + myId + "/" + receiverUid).push(
            {
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                action: "add friend"
            })
            

    }else{
        if (myId != "" &&  receiverUid != ""){
            firebase.database().ref('globalUserStatus/userFriends/' + myId + "/" +receiverUid ).set(null)

        }
        

    }
    

}

export {changeFriendList};

export default LogEvent; 