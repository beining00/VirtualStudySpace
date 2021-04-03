import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import GoalAndTime from "./GoalAndTime";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import { MDBInput, MDBCol } from "mdbreact";
//import { MDBSmoothScroll } from "mdbreact";
import FriendItem from './FriendItem';
import Timer from './Timer'

import firebase, {auth} from './Firebase';
import {useAuthState} from 'react-firebase-hooks/auth';

const cardStyle1 = {
    width: "20rem",
    height: "8rem",
    marginTop: "20px"
};
const cardStyle2 = {
    width: "20rem",
    height: "8rem",

};
function Layout() {
    const [name, setName] = useState("");
    /*const [timer, setTime] =useState*/
    const onChangeName = (event) => {
        setName(event.target.value);
    };
    const [goal, setGoal] = useState("");
    /*const [timer, setTime] =useState*/
    const onChangeGoal = (event) => {
        setGoal(event.target.value);
    };
    // user state
    const [user] = useAuthState(auth);


    const [friendList, setFriendList] = useState([]);
    React.useEffect(() => {
        var dfRefObj = firebase.database().ref().child('users');
        //sync object changes
        dfRefObj.on('value', snap =>{
            //console.log('snap')
            console.log(snap.val());
            const _friendList = [];
            const friends = snap.val();
            for (let id in friends){
                _friendList.push({"uid":id, ...friends[id]});

            }
            setFriendList(_friendList);
        })

    }, [])

    function updateUserRecord(){
        console.log(name)
        console.log(goal)
        if (name == "" || goal == ""){
            alert("please fill in your name and goal properly")
        }else{
            const uid = (user) ? user.uid : "";
            if (uid != ""){
                firebase.database().ref('users/' + uid).set(
                    {
                        UserName : name,
                        UserStatus : goal
                    }
                );
            }
        }

    }

    return (
        <div className="LayOut">
            <Container >
                <Row>

                    <Col style={{ marginRight: "50px" }}>
                        {/* <MDBSmoothScroll to="listOfFriends">Section 1</MDBSmoothScroll> */}
                        <div>
                        <MDBCol lg="12">
                            <MDBInput hint="Search" type="text" containerClass="active-pink active-pink-2 mt-0 mb-3" />
                        </MDBCol>
                        <Card style={{ width: '18rem' }}>
                            <Card.Header>Friends</Card.Header>
                            <ListGroup id = "ListOfFriends" variant="flush">

                                {friendList.map((friend, index) =>{

                                    // TODO skip the record that is below to the current use
                                    console.log(friend)
                                    return (
                                        <FriendItem userName={friend.UserName} userStatus={friend.UserStatus} />
                                    )
                                })}

                            </ListGroup>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div >
                            <Card style={cardStyle1}>
                                <Card.Body>
                                    <Card.Title>Hello {name}</Card.Title>
                                    <Card.Text>
                                        <input type="text" placeholder="What is your name ?" value={name}
                                            onChange={onChangeName} />
                                        <Button onClick = {()=>updateUserRecord()} style={{margin:"5px"}}>Submit</Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card style={cardStyle1}>
                                <Card.Body>
                                    <Card.Title>Your Goal</Card.Title>
                                    <Card.Text>
                                        <input type="text" placeholder="What are your goals today" value={goal}
                                            onChange={onChangeGoal} />
                                            <Button onClick = {()=>updateUserRecord()} style={{margin:"5px"}}>Submit</Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Timer goal={goal}/>
                </Row>
            </Container>
        </div>);
}
export default Layout;
