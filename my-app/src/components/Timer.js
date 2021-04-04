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
import LogEvent from './LogEvent';
import firebase, {auth} from './Firebase'

function Timer(goal) {
  const [totalTime, updateTotalTimer] = useState({seconds: 0, minutes: 0, hours: 0})
  const [workingTime, updateWorkingTimer] = useState({seconds: 0, minutes: 0, hours: 0})
  const [breakTime, updateBreakTimer] = useState({seconds: 0, minutes: 0, hours: 0})
  // const [bathroomBreakTime, updateBathroomBreakTimer] = useState({seconds: 0, minutes: 0, hours: 0})
  // const [snackBreakTime, updateSnackBreakTimer] = useState({seconds: 0, minutes: 0, hours: 0})
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

  // useEffect( () => {
  //   if (timerRunning === 'bathroomBreak') {
  //     updateTime(bathroomBreakTime, updateBathroomBreakTimer)
  //   }
  // }, [timerRunning, bathroomBreakTime]
  // )

  // useEffect( () => {
  //   if (timerRunning === 'snackBreak') {
  //     updateTime(snackBreakTime, updateSnackBreakTimer)
  //   }
  // }, [timerRunning, snackBreakTime]
  // )

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
    // LogEvent(auth.currentUser.uid,'breakLog', {
    //   time: workingTime,
    //   break: breakTime,
    //   goal: goal.goal
    // })

 
  }

  function time2hours(time){
    return time.hours + "." + Math.round(time.minutes/60 *100)/100 
  }
  function breakTimer() {
    setRunning('break')
    // log event 
    console.log("time debug")
    console.log(goal)
    
    LogEvent(auth.currentUser.uid,'workLog', {
      time: time2hours(workingTime),
      break: time2hours(breakTime),
      workingPerc:time2hours(totalTime)==0? 0: Math.round(time2hours(workingTime)/ time2hours(totalTime) * 100) ,
      goal: goal.goal
    })

    
  }

  // function bathroomBreakTimer() {
  //   setRunning('bathroomBreak')

  //   ReactDOM.render(
  //     <>
  //       <Button style={{margin:"5px"}} onClick={() => startTimer()}> Start Working </Button>
  //       {/* <Button style={{margin:"5px"}} onClick={() => breakTimer()}> Take Break </Button>
  //       <Button style={{margin:"5px"}} onClick={() => snackBreakTimer()}> Take Snack Break </Button> */}
  //       <Button style={{margin:"5px"}} onClick={() => stopTimer()}> Stop Timer</Button>
  //     </>,
  //     document.getElementById('timerButtons')
  //   );
  // }

  // function snackBreakTimer() {
  //   setRunning('snackBreak')

  //   ReactDOM.render(
  //     <>
  //       <Button style={{margin:"5px"}} onClick={() => startTimer()}> Start Working </Button>
  //       <Button style={{margin:"5px"}} onClick={() => breakTimer()}> Take Break </Button>
  //       <Button style={{margin:"5px"}} onClick={() => bathroomBreakTimer()}> Take Bathroom Break </Button>
  //       <Button style={{margin:"5px"}} onClick={() => stopTimer()}> Stop Timer</Button>
  //     </>,
  //     document.getElementById('timerButtons')
  //   );
  // }

  // function stopTimer() {
  //   setRunning('stopped')

  //   ReactDOM.render(
  //     <>
  //       <Button style={{margin:"5px"}} onClick={() => startTimer()}> Start Timer </Button>
  //     </>,
  //     document.getElementById('timerButtons')
  //   );
  // }

  const cardStyle2 = {
    width:  "100%",
    height: "98%",

    
  }



  return (
  <>
  
        <Card style={cardStyle2}>
          <Card.Body>
            <Card.Title>Time spent on {goal.goal.toUpperCase()} </Card.Title>
            <div className="TimerDisplay">
                <p>
                  <span style={{fontSize:"20px"}}> TOTAL TIME </span>
                  <TimerDisplay currentTime={totalTime} timeSize={"28px"}/>
                </p>

                <Container>
                  <Row style={{width:"100%"}}>
                    <Col >
                      <p>
                        <span style={{fontSize:"15px"}}> WORKING </span>
                        <TimerDisplay currentTime={workingTime} timeSize={"18px"}/>
                      </p>
                    </Col>
                    <Col >
                      <p>
                        <span style={{fontSize:"15px"}}> BREAK </span>
                        <TimerDisplay currentTime={breakTime} timeSize={"18px"}/>
                      </p>
                    </Col>
                  </Row>

                </Container>

                <div id="timerButtons">
                {
                  timerRunning!="working" ? <Button style={{margin:"5px"}} onClick={() => startTimer()} variant="success"> Start Timer</Button>
                  :<Button style={{margin:"5px"}} onClick={() => breakTimer()} variant="light"> Take Break </Button>
                }
                  
                </div>
            </div>
          </Card.Body>
        </Card>
    

  </>
  );
}

export default Timer;