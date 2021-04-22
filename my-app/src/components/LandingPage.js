import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

function LandingPage(){
    return (
        <Jumbotron fluid style={{height:'22vh'}}>
        <Container>
            <h1>Virtual Study Space</h1>
            <p>
            Welcome to the Virtual Study Space. In the Study Space, you can set your goal, track your study time and 
            even stalk your friends! 
            </p>
        </Container>
        </Jumbotron>
    )
}

export default LandingPage;