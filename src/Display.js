import React from 'react';
import {set_pause, set_type, reset_controls, reset_break, reset_session} from './actions';
import {connect} from 'react-redux';
import store from './store';

import {displayTimeLeft, convertNum} from './functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faSync } from '@fortawesome/free-solid-svg-icons';

let countdown;
//const state = store.getState();

class Display extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            time: convertNum(this.props.sessionTime)
        }
    }
    reset(){
        clearInterval(countdown);
        this.props.reset_controls();
        this.props.reset_break();
        this.props.reset_session();
        const audio = document.getElementById('beep');
        audio.pause();
        audio.currentTime = 0;
    }
    controlTimer(){
        this.props.set_pause();
        if(!this.props.isPaused){
            this.runTimer();
        }else{
            clearInterval(countdown);
        }
    }
    runTimer(){
        // clear any existing timers
        clearInterval(countdown);

        let secondsLeft = parseInt(this.state.time.split(":")[0])*60+parseInt(this.state.time.split(":")[1]);
        
        countdown = setInterval(() => {
            secondsLeft = secondsLeft - 1;
            // check if we should stop it!
            if(secondsLeft < 0) {
                clearInterval(countdown);
                return;
            }
            // display it
            this.setState({
                time: displayTimeLeft(secondsLeft)
            })
        }, 1000);
    
    }
    handleChange(){
        if(this.state.time==='00:00'){
            const audio = document.getElementById('beep');
            audio.play();
            
            setTimeout(()=>{ //need to delay 1 second to pass test
                const state = store.getState();
                if(this.props.type==='Session'){ 
                    this.props.set_type('Break');
                    this.setState(() => ({
                        time: convertNum(state.BreakReducer.break)
                    }), () => {this.runTimer()});
                }else{
                    this.props.set_type('Session')
                    this.setState(state => ({
                        time: convertNum(state.SessionReducer.session)
                    }), () => {this.runTimer()});
                }
            }, 1000)
        }
    }
    componentDidUpdate() {
        this.handleChange();
    }

    render(){
        return(
            <div>
                <h2 id="timer-label">{this.props.type}</h2>
                <div id="time-left">{this.state.time}</div>
                <button id="start_stop" onClick={this.controlTimer}>
                    <FontAwesomeIcon className="fa-2x" icon={faPlay}/>
                    <FontAwesomeIcon className="fa-2x" icon={faPause}/>
                </button>
                <button id="reset" onClick={this.reset}><FontAwesomeIcon className="fa-2x" icon={faSync}/></button>
                <audio id="beep" src="https://goo.gl/65cBl1"></audio>
          </div>
        );
    }
}

function mapStateToProps(state){
    return{
        isPaused: state.DisplayReducer.isPaused,
        type: state.DisplayReducer.type,
        sessionTime: state.SessionReducer.session
    };
}

const mapDispatchToProps = (dispatch) => {
    return{
        set_pause: () => {dispatch(set_pause())},
        set_type: (label) => {
           dispatch(set_type(label))
        },
        reset_controls: () => {dispatch(reset_controls())},
        reset_break: () => {dispatch(reset_break())},
        reset_session: () => {dispatch(reset_session())}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Display);
