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

import { GiAchievement } from "react-icons/gi";
//import { MDBSmoothScroll } from "mdbreact";
import FriendItem from './FriendItem';
import PersonalLog from './PersonalLog';
import Timer from './Timer'
import MessageSection from './MessageSection';

import firebase, {auth} from './Firebase';
import {useAuthState} from 'react-firebase-hooks/auth';

import rtdb_presence from './rtdb_presence';
import _ from "lodash";

const cardStyle1 = {
    width: "20rem",
    height: "8rem",
    marginTop: "20px"
};
const cardStyle2 = {
    width: "20rem",
    height: "8rem",

};

const cardStyle3 = {
    width: "40rem",
    height: "15rem",
    marginTop: "20px"

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

        // toggle user state, online/ offline
        rtdb_presence();

        // add listener to the friend items
        var dfRefObj = firebase.database().ref().child('/');
        //sync object changes
        dfRefObj.on('value', snap =>{
            console.log('user record changes ')
            console.log(snap.val());
            const _friendList = [];
            const friends = snap.val().users;
            const friendPre = snap.val().presence;
            const uid2index  = {};
            var index = 0;
            for (let id in friends){
                _friendList.push({"uid":id, ...friends[id]});
                uid2index[id] = index
                index ++;

            }

            for (let id in friendPre){
                _friendList[uid2index[id]] = {..._friendList[uid2index[id]], "state": friendPre[id].state};
            }

            //_.sortBy(_friendList, [function(o) { return o.state == 'online'?1:0; }]);
            console.log("final friend list")
            console.log(_friendList);
            setFriendList(_friendList);
        })

        // var presenceRefObj = firebase.database().ref().child('status');
        // //sync object changes
        // presenceRefObj.on('value', snap =>{
        //     console.log('user presence changes ')
        //     console.log(snap.val());
        //     const _friendList = [];
        //     const friends = snap.val();
        //     for (let id in friends){
        //         _friendList.push({"uid":id, ...friends[id]});

        //     }
        //     setFriendList(_friendList);
        // })

    }, [])

    function updateUserRecord(){
        console.log("send user record the the database")
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
                <Row xs="2">
                    <Col>
                        {/* <MDBSmoothScroll to="listOfFriends">Section 1</MDBSmoothScroll> */}
                        <div>
                        <MDBCol lg="12">
                            <MDBInput hint="Search" type="text" containerClass="active-pink active-pink-2 mt-0 mb-3" />
                        </MDBCol>
                        <Card style={{ width: '18rem' }}>
                            <Card.Header>Friends</Card.Header>
                            <ListGroup id = "ListOfFriends" variant="flush">

                                {_.sortBy(friendList, [function(o) { return o.state == 'online'?0:1; }]).map((friend, index) =>{

                                    // TODO skip the record that is below to the current use
                                    console.log(friend)
                                    return (
                                        <FriendItem userName={friend.UserName} userStatus={friend.UserStatus} userState={friend.state}/>
                                    )
                                })}

                            </ListGroup>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <Row xs="2">
                            <Col>
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
                                        <Card.Title>Your Goal<GiAchievement/></Card.Title>

                                        <Card.Text>
                                            <input type="text" placeholder="What are your goals today" value={goal}
                                                onChange={onChangeGoal} />
                                                <Button onClick = {()=>updateUserRecord()} style={{margin:"5px"}}>Submit</Button>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Timer goal={goal}/>
                        </Row>
                        <Row>
                            <Card style={cardStyle3}>
                                <MessageSection />
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>);
}
export default Layout;
