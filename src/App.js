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

class App extends React.Component{
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
