import React from 'react';
import './App.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

import {Provider} from 'react-redux';

import store from './store';
import SessionCounter from './SessionCounter.js';
import BreakCounter from './BreakCounter';
import Display from './Display';


//css
document.body.style.backgroundColor = "hsl(60, 100%, 90%)";

// let countdown;

// function displayTimeLeft(seconds) {
//   const minutes = Math.floor(seconds / 60);
//   const remainderSeconds = seconds % 60;
//   const display = `${minutes < 10 ? '0' : '' }${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
//   return display;
// }
// function convertNum(num){
//   const prefix = num < 10 ? '0' : '';
//   return prefix + num + ':00';
// }

class App extends React.Component{
  /*
  constructor(props){
    super(props)
    this.state={
      break: 5,
      session: 25,
      timeLeft: '25:00',
      isPaused: true,
      type: 'Session'
    }
    this.reset = this.reset.bind(this);
    this.breakDec = this.breakDec.bind(this);
    this.breakInc = this.breakInc.bind(this);
    this.sessionDec = this.sessionDec.bind(this);
    this.sessionInc = this.sessionInc.bind(this);
    this.controlTimer = this.controlTimer.bind(this);
    this.runTimer = this.runTimer.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  reset(){
    clearInterval(countdown);
    this.setState({
      break: 5,
      session: 25,
      timeLeft: '25:00',
      isPaused: true,
      type: 'Session'
    })
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  }
  breakDec(){
    if(this.state.break>1){
      this.setState(state => ({
        break: state.break-1
      }))
    }
  }
  breakInc(){
    if(this.state.break<60){
      this.setState(state => ({
        break: state.break+1
      }))
    }
  }
  sessionDec(){
    if(this.state.session>1 && this.state.isPaused){
      this.setState(state => ({
        session: state.session-1
      }), () => {
        this.setState(state => ({
          timeLeft: displayTimeLeft(state.session*60)
        }))
      })
    }
  }
  sessionInc(){
    if(this.state.session<60 && this.state.isPaused){
      this.setState(state => ({
        session: state.session+1
      }), () => {
        this.setState(state => ({
          timeLeft: displayTimeLeft(state.session*60)
        }))
      })
    }
  }
  controlTimer(){
    this.setState(state => ({
     isPaused: !state.isPaused
    }), () => {
      if(!this.state.isPaused){
        this.runTimer();
      }else{
        clearInterval(countdown);
      }
    })
  }
  runTimer(){
    // clear any existing timers
    clearInterval(countdown);

    let secondsLeft = parseInt(this.state.timeLeft.split(":")[0])*60+parseInt(this.state.timeLeft.split(":")[1]);
    
    countdown = setInterval(() => {
      secondsLeft = secondsLeft - 1;
      // check if we should stop it!
      if(secondsLeft < 0) {
        clearInterval(countdown);
        return;
      }
      // display it
      this.setState({
        timeLeft: displayTimeLeft(secondsLeft)
      })
    }, 1000);
    
  }
  handleChange(){
    if(this.state.timeLeft==='00:00'){
      const audio = document.getElementById('beep');
      audio.play();
      
      setTimeout(()=>{ //need to delay 1 second to pass test
        if(this.state.type==='Session'){ 
              this.setState(state => ({
                type: 'Break',
                timeLeft: convertNum(state.break)
              }), ()=>{
                this.runTimer();
              })
            }else{
              this.setState(state => ({
                type: 'Session',
                timeLeft: convertNum(state.session)
              }), ()=>{
                this.runTimer();
              })
            }
      }, 1000)
    }
  }
  componentDidUpdate() {
    this.handleChange();
  }
  */
  render(){
    return(
      <Provider store={store}>
        <div className="container-fluid">
          <link href="https://fonts.googleapis.com/css?family=Orbitron&display=swap" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css?family=Zhi+Mang+Xing&display=swap" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css?family=Barlow&display=swap" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css?family=Exo+2&display=swap" rel="stylesheet"/>

          <h1>Pomodoro Clock</h1>
          <div className="row">
            <h2 id='break-label' className="col">Break Length</h2>
            <h2 id='session-label' className="col">Session Length</h2>
          </div>
          <div className="row">
            <div className="col">
            <div><BreakCounter/></div>           
            </div>
            <div className="col">
            <div><SessionCounter/></div>           
            </div>
          </div>
          <Display/>
          <p id="footer">Designed and coded by Joe Liang.</p>
        </div>
      </Provider>
    )
  }
}

export default App;
