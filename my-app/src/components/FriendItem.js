import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { MdPerson ,MdThumbUp} from "react-icons/md";
import { MDBBadge, MDBContainer } from "mdbreact";
import LogEvent from './LogEvent'

function FriendItem(props){
    const {myName,myID,userUID,userName, userStatus, userState} = props;
    console.log(userState);
    const icon_color = !userState? 'primary' :userState=="offline" ?'primary' : 'green';

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
    return (

        <ListGroup.Item><MdPerson style={{ color: icon_color }} />{userName }

            {(userState && userState =="online" ) &&
                (<>
                <MDBBadge color="success">{userStatus}</MDBBadge>

                <button class="btn" onClick = {()=>sendLike()}><i className="fa fa-folder"></i>
                <MdThumbUp style ={{textAlign: "right", color:"CornflowerBlue", fontSize: '25px'}}/>
                
                </button>
                
                
                </>)
                
            }

            
   
        
        
        </ListGroup.Item>
    )

}

export default FriendItem;