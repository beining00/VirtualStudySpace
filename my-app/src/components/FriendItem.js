import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { MdPerson ,MdThumbUp,MdAddCircleOutline,MdRemoveCircleOutline} from "react-icons/md";
import { MDBBadge, MDBContainer } from "mdbreact";
import LogEvent, {changeFriendList} from './LogEvent'

function FriendItem(props){
    const {myName,myID,userUID,userName, userStatus, userState, isFriend, isMyself} = props;
    console.log(userState);
    console.log(userUID)
    const [iconColor, setIconColor] = React.useState("primary")
    
    React.useEffect(()=>{
        if (userState && userState == "online"){
            setIconColor('green')
        }else{
            setIconColor('primary')
        }
        

    }, [])

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
            <MdPerson style={{ color: iconColor}} /> 
            
            {userName }

           
            {(userState && userState =="online" && !isMyself) &&
                (<>
          
                
                
                <button class="btn like_btn" onClick = {()=> sendLike()}><i className="fa fa-folder"></i>
                 <MdThumbUp style ={{textAlign: "right", color:"CornflowerBlue", fontSize: '25px'}}/>
                   
                </button>
                
                
                </>)
                
            }
            {/* remove friend icon */}
          
            {(isFriend && !isMyself)&& (
                <button class="btn friend_state_btn" onClick = {()=>removeFriend()}><i className="fa fa-folder"></i>
                <MdRemoveCircleOutline style ={{textAlign: "right", color:"CornflowerBlue", fontSize: '25px'}}/>
                </button>
            )
            }

            {(!isFriend && !isMyself)&& (
                <button class="btn friend_state_btn" onClick = {()=>addFriend()}><i className="fa fa-folder"></i>
                <MdAddCircleOutline style ={{textAlign: "right", color:"CornflowerBlue", fontSize: '25px'}}/>
                </button>
            )}
               
               

            <br/>
            { (userState && userState =="online") &&
                <MDBBadge color="success">{userStatus}</MDBBadge>}

            
   
        
        
        </ListGroup.Item>
    )

}

export default FriendItem;