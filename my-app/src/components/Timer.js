import React from 'react';
import ReactDOM from 'react-dom';
import '../css/App.css';
import {useState, useEffect} from 'react'
import TimerDisplay from './TimerDisplay'

function Timer() {
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

  return (
  <div className="TimerDisplay">
      <p>
          TOTAL TIME
      </p>
      <TimerDisplay currentTime={totalTime}/>

      <p>
          WORKING TIME
      </p>
      <TimerDisplay currentTime={workingTime}/>

      <p>
          BREAK TIME
      </p>
      <TimerDisplay currentTime={breakTime}/>

      <p>
          BATHROOM BREAK TIME
      </p>
      <TimerDisplay currentTime={bathroomBreakTime}/>

      <p>
          SNACK BREAK TIME
      </p>
      <TimerDisplay currentTime={snackBreakTime}/>

      <div id="timerButtons">
        <button onClick={() => startTimer()}> Start Timer</button>
      </div>
  </div>
  );
}

export default Timer;