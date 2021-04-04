import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { MdPerson ,MdThumbUp,MdAddCircleOutline,MdRemoveCircleOutline} from "react-icons/md";
import { MDBBadge, MDBContainer } from "mdbreact";
import LogEvent, {changeFriendList} from './LogEvent'

function FriendItem(props){
    const {myName,myID,userUID,userName, userStatus, userState, isFriend} = props;
    console.log(userState);
    console.log(userUID)

    //const icon_color = !userState? 'primary' :userState=="offline" ?'primary' : 'green';

    function sendLike(){
        // get the uid for the user 

        // write a record to the personalLog/uid, with messageType 'like'
        console.log("liked")
        // log to friend screen 
        LogEvent(userUID, "like", {
                    senderName : myName,
                    senderID : myID,
                    receiverName : userName

                })
        // log to my screen 
        LogEvent(myID, "like", {
            senderName : myName,
            senderID : myID,
            receiverName : userName

        })
    }

    function addFriend(){
        console.log("addFriend")
        changeFriendList(true, userUID, myID)

    }

    function removeFriend(){
        console.log("removeFriend")
        changeFriendList(false, userUID, myID)

    }
    return (

        <ListGroup.Item>
            {(userState && userState =="online" )? <MdPerson style={{ color: 'green'}} /> : <MdPerson style={{ color: 'primary'}} />}
        
            {userName }

           
            {(userState && userState =="online") &&
                (<>
                <MDBBadge color="success">{userStatus}</MDBBadge>

                <button class="btn" onClick = {()=> sendLike()}><i className="fa fa-folder"></i>
                 <MdThumbUp style ={{textAlign: "right", color:"CornflowerBlue", fontSize: '25px'}}/>
                   
                </button>
                
                
                </>)
                
            }
            {/* remove friend icon */}
            {isFriend ?
                <button class="btn" onClick = {()=>removeFriend()}><i className="fa fa-folder"></i>
                <MdRemoveCircleOutline style ={{textAlign: "right", color:"CornflowerBlue", fontSize: '25px'}}/>
                </button>
                :<button class="btn" onClick = {()=>addFriend()}><i className="fa fa-folder"></i>
                <MdAddCircleOutline style ={{textAlign: "right", color:"CornflowerBlue", fontSize: '25px'}}/>
                </button>

            }

            
   
        
        
        </ListGroup.Item>
    )

}

export default FriendItem;