import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { MdPerson ,MdThumbUp} from "react-icons/md";
import { MDBBadge, MDBContainer } from "mdbreact";

function FriendItem(props){
    const {userName, userStatus, userState} = props;
    console.log(userState);
    const icon_color = !userState? 'primary' :userState=="offline" ?'primary' : 'green';

    function like(){
        console.log("liked")
    }
    return (

        <ListGroup.Item><MdPerson style={{ color: icon_color }} />{userName }

            {(userState && userState =="online" ) &&
                (<>
                <MDBBadge color="success">{userStatus}</MDBBadge>

                <button class="btn" onClick = {()=>like()}><i className="fa fa-folder"></i>
                <MdThumbUp style ={{textAlign: "right", color:"CornflowerBlue", fontSize: '25px'}}/>
                
                </button>
                
                
                </>)
                
            }

            
   
        
        
        </ListGroup.Item>
    )

}

export default FriendItem;