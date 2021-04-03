import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

function FriendItem(props){
    const {userName, userStatus} = props;
    return (
        <ListGroup.Item>{userName + "| " + userStatus}</ListGroup.Item>
    )

}

export default FriendItem;