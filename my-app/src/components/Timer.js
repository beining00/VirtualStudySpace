import React from 'react';
import ReactDOM from 'react-dom';
import '../css/App.css';
import {useState, useEffect} from 'react'
import TimerDisplay from './TimerDisplay'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Timer(goal) {
  const [totalTime, updateTotalTimer] = useState({seconds: 0, minutes: 0, hours: 0})
  const [workingTime, updateWorkingTimer] = useState({seconds: 0, minutes: 0, hours: 0})
  const [breakTime, updateBreakTimer] = useState({seconds: 0, minutes: 0, hours: 0})
  const [bathroomBreakTime, updateBathroomBreakTimer] = useState({seconds: 0, minutes: 0, hours: 0})
  const [snackBreakTime, updateSnackBreakTimer] = useState({seconds: 0, minutes: 0, hours: 0})
  const [timerRunning, setRunning] = useState('stopped')


  useEffect( () => {
    if (timerRunning != 'stopped') {
      updateTime(totalTime, updateTotalTimer)
    }
  }, [timerRunning, totalTime]
  )

  useEffect( () => {
    if (timerRunning === 'working') {
      updateTime(workingTime, updateWorkingTimer)
    }
  }, [timerRunning, workingTime]
  )

  useEffect( () => {
    if (timerRunning === 'break') {
      updateTime(breakTime, updateBreakTimer)
    }
  }, [timerRunning, breakTime]
  )

  useEffect( () => {
    if (timerRunning === 'bathroomBreak') {
      updateTime(bathroomBreakTime, updateBathroomBreakTimer)
    }
  }, [timerRunning, bathroomBreakTime]
  )

  useEffect( () => {
    if (timerRunning === 'snackBreak') {
      updateTime(snackBreakTime, updateSnackBreakTimer)
    }
  }, [timerRunning, snackBreakTime]
  )

  function updateTime(time, methodName) {
    const timer = setTimeout( () => {
      var newSeconds = time.seconds + 1
      var newMinutes = time.minutes
      var newHours =  time.hours

      if (newSeconds >= 60) {
        newSeconds = 0
        newMinutes += 1
      }

      if (newMinutes >= 60) {
        newMinutes = 0
        newHours += 1
      }

      methodName({
        seconds: newSeconds,
        minutes: newMinutes,
        hours: newHours})
    }, 1000)

    return ( () => clearTimeout(timer))
  }


  function startTimer() {
    setRunning('working')

    ReactDOM.render(
      <>
        <Button style={{margin:"5px"}} onClick={() => breakTimer()}> Take Break </Button>
        <Button style={{margin:"5px"}} onClick={() => bathroomBreakTimer()}> Take Bathroom Break </Button>
        <Button style={{margin:"5px"}} onClick={() => snackBreakTimer()}> Take Snack Break </Button>
        <Button style={{margin:"5px"}} onClick={() => stopTimer()}> Stop Timer</Button>
      </>,
      document.getElementById('timerButtons')
    );
  }

  function breakTimer() {
    setRunning('break')

    ReactDOM.render(
      <>
        <Button style={{margin:"5px"}} onClick={() => startTimer()}> Start Working </Button>
        <Button style={{margin:"5px"}} onClick={() => bathroomBreakTimer()}> Take Bathroom Break </Button>
        <Button style={{margin:"5px"}} onClick={() => snackBreakTimer()}> Take Snack Break </Button>
        <Button style={{margin:"5px"}} onClick={() => stopTimer()}> Stop Timer</Button>
      </>,
      document.getElementById('timerButtons')
    );
  }

  function bathroomBreakTimer() {
    setRunning('bathroomBreak')

    ReactDOM.render(
      <>
        <Button style={{margin:"5px"}} onClick={() => startTimer()}> Start Working </Button>
        <Button style={{margin:"5px"}} onClick={() => breakTimer()}> Take Break </Button>
        <Button style={{margin:"5px"}} onClick={() => snackBreakTimer()}> Take Snack Break </Button>
        <Button style={{margin:"5px"}} onClick={() => stopTimer()}> Stop Timer</Button>
      </>,
      document.getElementById('timerButtons')
    );
  }

  function snackBreakTimer() {
    setRunning('snackBreak')

    ReactDOM.render(
      <>
        <Button style={{margin:"5px"}} onClick={() => startTimer()}> Start Working </Button>
        <Button style={{margin:"5px"}} onClick={() => breakTimer()}> Take Break </Button>
        <Button style={{margin:"5px"}} onClick={() => bathroomBreakTimer()}> Take Bathroom Break </Button>
        <Button style={{margin:"5px"}} onClick={() => stopTimer()}> Stop Timer</Button>
      </>,
      document.getElementById('timerButtons')
    );
  }

  function stopTimer() {
    setRunning('stopped')

    ReactDOM.render(
      <>
        <Button style={{margin:"5px"}} onClick={() => startTimer()}> Start Timer </Button>
      </>,
      document.getElementById('timerButtons')
    );
  }

  const cardStyle2 = {
    width:  "100%",
    height: "37.5vh",

    
  }

  const timerLeftColumn = {
    width: "40%",
    paddingLeft:"10%",
    position: "absolute",
    left: "0px"
  }

  const timerRightColumn = {
    width: "35%",
    position: "absolute",
    right: "0px",
  }

  return (
  <>
  
        <Card style={cardStyle2}>
          <Card.Body>
            <Card.Title>Set time for your {goal.goal} </Card.Title>
            <div className="TimerDisplay">
                <p>
                  <span style={{fontSize:"22px"}}> TOTAL TIME </span>
                  <TimerDisplay currentTime={totalTime}/>
                </p>

                <Container>
                  <Row style={{width:"100%"}}>
                    <Col style={{width:"40%", paddingLeft:"15%"}}>
                      <p>
                        <span style={{fontSize:"18px"}}> WORKING </span>
                        <TimerDisplay currentTime={workingTime}/>
                      </p>
                    </Col>
                    <Col style={timerRightColumn}>
                      <p>
                        <span style={{fontSize:"18px"}}> BREAK </span>
                        <TimerDisplay currentTime={breakTime}/>
                      </p>
                    </Col>
                  </Row>

                  <Row>
                    <Col style={{width:"40%", paddingLeft:"12.8%"}}>
                      <p>
                        <span style={{fontSize:"18px"}}> BATHROOM </span>
                        <TimerDisplay currentTime={bathroomBreakTime}/>
                      </p>
                    </Col>
                    <Col style={timerRightColumn}>
                      <p>
                        <span style={{fontSize:"18px"}}> SNACK </span>
                        <TimerDisplay currentTime={snackBreakTime}/>
                      </p>
                    </Col>
                  </Row>
                </Container>

                <div id="timerButtons">
                  <Button style={{margin:"5px"}} onClick={() => startTimer()}> Start Timer</Button>
                </div>
            </div>
          </Card.Body>
        </Card>
    

  </>
  );
}

export default Timer;