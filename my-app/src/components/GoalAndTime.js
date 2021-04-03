import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Row'; 
import Card from 'react-bootstrap/Card';
//import { GiAchievement } from "react-icons/fa"; 

const cardStyle1 = {
    width: "20rem",
    height: "8rem",
}; 
const cardStyle2 = {
    width: "20rem",
    height: "8rem",
  
    marginLeft: "50px"
}; 
function GoalAndName() {
    const [goal, setGoal] = useState("");
    /*const [timer, setTime] =useState*/
    const onChange = (event) => {
        setGoal(event.target.value);
    };
    return (
        <Container >
        <Row>
         <Col Card style={cardStyle1}>

                    <Card.Body>
                        <Card.Title>Your Goal</Card.Title>
                        <Card.Text>
                        <input type="text" placeholder="What are your goals today" value={goal}
                                onChange={onChange} />
                        </Card.Text>
                        </Card.Body>
         </Col>
            <Col Card style={cardStyle2}>
                        <Card.Body>
                        <Card.Title>Set time for your {goal} </Card.Title>
                        </Card.Body> 
            </Col>
        </Row>
        </Container> 
    );
}
export default GoalAndName;
