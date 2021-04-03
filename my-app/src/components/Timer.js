import React from 'react';
import ReactDOM from 'react-dom';
import '../css/App.css';
import {useState, useEffect} from 'react'
import TimerDisplay from './TimerDisplay'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

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
        <button onClick={() => breakTimer()}> Take Break </button>
        <button onClick={() => bathroomBreakTimer()}> Take Bathroom Break </button>
        <button onClick={() => snackBreakTimer()}> Take Snack Break </button>
        <button onClick={() => stopTimer()}> Stop Timer</button>
      </>,
      document.getElementById('timerButtons')
    );
  }

  function breakTimer() {
    setRunning('break')

    ReactDOM.render(
      <>
        <button onClick={() => startTimer()}> Start Working </button>
        <button onClick={() => bathroomBreakTimer()}> Take Bathroom Break </button>
        <button onClick={() => snackBreakTimer()}> Take Snack Break </button>
        <button onClick={() => stopTimer()}> Stop Timer</button>
      </>,
      document.getElementById('timerButtons')
    );
  }

  function bathroomBreakTimer() {
    setRunning('bathroomBreak')

    ReactDOM.render(
      <>
        <button onClick={() => startTimer()}> Start Working </button>
        <button onClick={() => breakTimer()}> Take Break </button>
        <button onClick={() => snackBreakTimer()}> Take Snack Break </button>
        <button onClick={() => stopTimer()}> Stop Timer</button>
      </>,
      document.getElementById('timerButtons')
    );
  }

  function snackBreakTimer() {
    setRunning('snackBreak')

    ReactDOM.render(
      <>
        <button onClick={() => startTimer()}> Start Working </button>
        <button onClick={() => breakTimer()}> Take Break </button>
        <button onClick={() => bathroomBreakTimer()}> Take Bathroom Break </button>
        <button onClick={() => stopTimer()}> Stop Timer</button>
      </>,
      document.getElementById('timerButtons')
    );
  }

  function stopTimer() {
    setRunning('stopped')

    ReactDOM.render(
      <>
        <button onClick={() => startTimer()}> Start Timer </button>
      </>,
      document.getElementById('timerButtons')
    );
  }

  const cardStyle2 = {
    width: "30vw",
    height: "8vh",

    marginLeft: "50px",

    border:"solid"
  }

  const timerCardColumn = {
    width: "50%"
  }

  return (
  <>
    <Col Card style={cardStyle2}>
      <Card.Body>
        <Card.Title>Set time for your {goal.goal} </Card.Title>
        <Card.Subtitle className="total-time">Total time</Card.Subtitle>
        <div className="TimerDisplay">
            <p>
              TOTAL TIME
              <TimerDisplay currentTime={totalTime}/>
            </p>

            <Container>
              <Row>
                <Col style={{width:"50%"}}>
                  <p>
                    WORKING TIME
                    <TimerDisplay currentTime={workingTime}/>
                  </p>
                </Col>
                <Col style={{width:"50%"}}>
                  <p>
                    BREAK TIME
                    <TimerDisplay currentTime={breakTime}/>
                  </p>
                </Col>
              </Row>

              <Row style={{width:"50%"}}>
                <Col>
                  <p>
                    BATHROOM BREAK TIME
                    <TimerDisplay currentTime={bathroomBreakTime}/>
                  </p>
                </Col>
                <Col>
                  <p>
                    SNACK BREAK TIME
                    <TimerDisplay currentTime={snackBreakTime}/>
                  </p>
                </Col>
              </Row>
            </Container>

            <div id="timerButtons">
              <button onClick={() => startTimer()}> Start Timer</button>
            </div>
        </div>
      </Card.Body>
    </Col>

  </>
  );
}

export default Timer;