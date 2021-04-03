import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
//import { GiAchievement } from "react-icons/fa";
const cardStyle1 = {
    width: "20rem",
    height: "8rem",
    marginTop: "20px"
};
function Name() {
    const [name, setName] = useState("");
    /*const [timer, setTime] =useState*/
    const onChange = (event) => {
        setName(event.target.value);
    };
    return (
        <Container>
            <Row>
                <Col Card style={cardStyle1}>
                    <Card.Body>
                        <Card.Title>Hello {name}</Card.Title>
                        <Card.Text>
                            <input type="text" placeholder="What is your name ?" value={name}
                                onChange={onChange} />
                        </Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Container>
    );
}
export default Name; 
