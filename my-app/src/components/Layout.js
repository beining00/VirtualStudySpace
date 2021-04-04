import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
import EditableTextInput from './EditableTextInput';
import TodoList from './TodoList'
import firebase, {auth} from './Firebase';
import {useAuthState} from 'react-firebase-hooks/auth';

import rtdb_presence from './rtdb_presence';
import _ from "lodash";
import { MdLocationSearching } from "react-icons/md";

const cardStyle1 = {

    //marginTop: "10px",
    height : '40%',
    width : "100%"

};
const cardStyle11 = {

    marginTop: "10px",
    height : '55%',
    width : "100%"

};
const cardStyle2 = {
    width: "20rem",
    height: "8rem",

};

const cardStyle3 = {
   
    height: "70%",
    //marginTop: "10px",
    width:'95%',
    marginLeft: "15px"
    

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



    //-------------------- fetch friend list --------------------------------
    // const [friendIDList, setFriendIDList] = useState([]);
    // React.useEffect(()=>{
    //     // toggle user state, online/ offline
    //     rtdb_presence();

    // }, [])
    //----------------------------------------------------------
    const [friendList, setFriendList] = useState([]);
    const [globalUserList, setglobalUserList] = useState([]);
    //read my Name and my Goal
    const uid = (user) ? user.uid : "";
    React.useEffect(() => {

        // toggle user state, online/ offline
        rtdb_presence();

        // add listener to the friend items
        var dfRefObj = firebase.database().ref().child('/globalUserStatus');
        //sync object changes
        dfRefObj.on('value', snap =>{
            console.log('user record changes ')
            //console.log(snap.val());
            console.log("fetch friend list ");
            
            const userFriends = snap.val().userFriends[uid];
            console.log(userFriends)
            
            

            // fetch global user 
            const _globalUserList = [];
            const _friendList = []
            
            const globalUsers = snap.val().users;
            const globalUserPre = snap.val().presence;
            const uid2index  = {};
            var index = 0;
            for (let id in globalUsers){
                _globalUserList.push({"uid":id, ...globalUsers[id]});
                uid2index[id] = index
                index ++;
                

            }

            for (let id in globalUserPre){
                _globalUserList[uid2index[id]] = {..._globalUserList[uid2index[id]], "state": globalUserPre[id].state};
            }
           
            
            if (typeof userFriends != "undefined"){
                const _removeIndex = []
                // now pop the friend list
                for (let id in globalUsers){
                    console.log("friend ids")
                    console.log(id)
                    console.log(typeof userFriends[id])
                    if (typeof userFriends[id] != "undefined"){
                        console.log("add")
                        // add to _friendList 
                        _friendList.push(_globalUserList[uid2index[id]])
                        // remove from global list 
                        _removeIndex.push(uid2index[id])
                        
                    }
                }

                //_.sortBy(_globalUserList, [function(o) { return o.state == 'online'?1:0; }]);
                console.log("final globalUser list")
                console.log(_globalUserList);
                _.pullAt(_globalUserList, _removeIndex)
                setFriendList(_friendList)
                
            }else{
                // no friend yet 
                setFriendList([])

            }
            
            setglobalUserList(_globalUserList);

            
            console.log(friendList)



        })

        
        if (uid != ""){
            firebase.database().ref().child("globalUserStatus/users").child(uid).get().then(function(snapshot) {
                if (snapshot.exists()) {


                    setName(snapshot.val().UserName)
                    setGoal(snapshot.val().UserStatus)
                }
                else {
                console.log("No data available");
                }
            }).catch(function(error) {
                console.error(error);
            });

        }


        // var presenceRefObj = firebase.database().ref().child('status');
        // //sync object changes
        // presenceRefObj.on('value', snap =>{
        //     console.log('user presence changes ')
        //     console.log(snap.val());
        //     const _globalUserList = [];
        //     const friends = snap.val();
        //     for (let id in friends){
        //         _globalUserList.push({"uid":id, ...friends[id]});

        //     }
        //     setFriendList(_globalUserList);
        // })

    }, [])

    const [searchContent, setSearchContent] = useState("")
    function filterUserList(){
        if (searchContent == ""){
            return globalUserList;

        }
        const _newUserList = [];
        for (let i in globalUserList){
            if (globalUserList[i].UserName.toLowerCase().startsWith(searchContent.toLowerCase())){
                _newUserList.push(globalUserList[i])
            }
        }
        return _newUserList;
    }
    

    function updateUserRecord(e){
        console.log("inputChanged")
        console.log(e)
        console.log("send user record the the database")
        console.log(name)
        console.log(goal)
        if (name == "" && goal == ""){
            alert("please fill in your name and goal properly")
        }else{
            const uid = (user) ? user.uid : "";
            if (uid != ""){
                firebase.database().ref('globalUserStatus/users/' + uid).set(
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
                    {/* --------left col of friend list ---------- */}
                    <Col md = '4'>
                        {/* <MDBSmoothScroll to="listOfFriends">Section 1</MDBSmoothScroll> */}
                        <div>
                        {/* <MDBCol lg="10"> */}
                            {/* <MDBInput hint="Search" type="text" containerClass="active-pink active-pink-2 mt-0 mb-3" /> */}
                        {/* </MDBCol> */}
                        {/* <Card style={{ width: '18rem' }}> */}
                        <Card className ="user_list">
                            <Card.Header className="friend_list_header">
                            👥 Friends 
                            
                            </Card.Header>
                            <ListGroup id = "ListOfFriends" variant="flush">

                                {_.sortBy(friendList, [function(o) { return o.state == 'online'?0:1; }]).map((friend, index) =>{

                                    // TODO skip the record that is below to the current use
                                    console.log(friend)
                                    return (
                                      <FriendItem myName={name} myID={user.uid} userUID= {friend.uid}
                                      userName={friend.UserName} userStatus={friend.UserStatus} userState={friend.state} isFriend ={true}/>
                                    )
                                })}

                            </ListGroup>
                            <Card.Header className="friend_list_header">
                            👥 World User 
                            <MDBInput hint="Search" type="text" containerClass="active-pink active-pink-2 mt-0 mb-3" onChange={(e)=>setSearchContent(e.target.value)}  />
                            </Card.Header>
                            
                            <ListGroup id = "ListOfFriends" variant="flush">
                            

                                {
                                 (_.sortBy(filterUserList(globalUserList)
                                     , [function(o) { return o.state == 'online'?0:1; }]))
                                .map((globalUser, index) =>{

                                    // TODO skip the record that is below to the current use
                                    console.log(globalUser)
                                    return (
                                      <FriendItem myName={name} myID={user.uid} userUID= {globalUser.uid}
                                      userName={globalUser.UserName} userStatus={globalUser.UserStatus} userState={globalUser.state} isFriend ={false}/>
                                    )
                                })}


                            </ListGroup>
                            </Card>
                        </div>
                    </Col>

                    {/* --------right col of timer + middle section ---------- */}
                   
                        
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                    <Col md = '8' >
=======
                    <Col md = '8'>
>>>>>>> parent of 511d42b2 (new authentication)
=======
                    <Col md = '8'>
>>>>>>> parent of 511d42b2 (new authentication)
=======
                    <Col md = '8'>
>>>>>>> parent of 511d42b2 (new authentication)
                        <Row >
                            <Col md = '6'>
                                <Card style={cardStyle1}>
                                    <Card.Body>
                                        <Card.Title>👋 Hello {name}</Card.Title>
                                        <Card.Text>
                                            {/* <input type="text" placeholder="What is your name ?" value={name}
                                                onChange={onChangeName} />
                                            <Button onClick = {()=>updateUserRecord()} style={{margin:"5px"}}>Submit</Button> */}
                                            <EditableTextInput defaultValue={"default"} value={name} 
                                                             onSave={()=>updateUserRecord()}  setValue ={setName} rows={1}/>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card style={cardStyle11}>
                                    <Card.Body>

                                        <Card.Title> 🔥 Your Goal<GiAchievement/></Card.Title>

                                        <Card.Text className = 'goal_field'>
                                        <EditableTextInput defaultValue={"default"} value={ goal} 
                                                             onSave={()=>updateUserRecord()}  setValue ={setGoal} rows={2}/>
                                            {/* <input type="text" placeholder="What are your goals today" value={goal}
                                                onChange={onChangeGoal} />
                                                <Button onClick = {()=>updateUserRecord()} style={{margin:"5px"}}>Submit</Button> */}
                                        </Card.Text>

                                        {/* <Card.Text>
                                           
                                            <EditableTextInput defaultValue={"default"} value={name} 
                                                             onSave={()=>updateUserRecord()}  setValue ={setName}/>
                                        </Card.Text> */}

                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md = '6'>
                            <Timer goal={goal} />
                            </Col>
                            
                        </Row>
                        <Row> 
                            
                                <Card style={cardStyle3}>
                                    <MessageSection userName={name}/>
                                </Card>
                            
                            
                            
                        </Row>
                        <br/>
                    </Col>
                    </Row>

            </Container>
        </div>);
}
export default Layout;
