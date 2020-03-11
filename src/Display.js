import React from 'react';
import {set_pause, set_type, reset_controls, reset_break, reset_session, reset_timer, update_counter} from './actions';
import {connect} from 'react-redux';
import store from './store';

import {displayTimeLeft, convertNum} from './functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faSync } from '@fortawesome/free-solid-svg-icons';

let countdown;
//const state = store.getState();

class Display extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         time: this.props.sessionTime
    //     }
    // }
    reset = () => {
        clearInterval(countdown);
        this.props.reset_controls();
        this.props.reset_break();
        this.props.reset_session();
        this.props.reset_timer();
        const audio = document.getElementById('beep');
        audio.pause();
        audio.currentTime = 0;
    }
    controlTimer = () => {
        if(this.props.isPaused){ //means was paused, now run timer
            this.runTimer();
        }else{
            clearInterval(countdown);
        }
        this.props.set_pause(); //statement placement doesn't matter, prop needs time to update so can't use it immediately after dispatch
    }
    runTimer = () => {
        // clear any existing timers
        clearInterval(countdown);
        let secondsLeft = parseInt(this.props.timeStr.split(":")[0])*60+parseInt(this.props.timeStr.split(":")[1]);
        
        countdown = setInterval(() => {
            secondsLeft = secondsLeft - 1;
            // check if we should stop it!
            if(secondsLeft < 0) {
                clearInterval(countdown);
                return;
            }
            // display it
            // this.setState({
            //     time: displayTimeLeft(secondsLeft)
            // })
            this.props.update_counter(displayTimeLeft(secondsLeft)); //note: cannot assign to prop as it's read only
        }, 1000);
    
    }
    // handleChange = () => {
    //     if(this.props.timeStr==='00:00'){
    //         const audio = document.getElementById('beep');
    //         audio.play();
            
    //         setTimeout(()=>{ //need to delay 1 second to pass test
    //             const state = store.getState();
    //             if(this.props.type==='Session'){ 
    //                 this.props.set_type('Break');
    //                 this.setState(() => ({
    //                     time: convertNum(state.BreakReducer.break)
    //                 }), () => {this.runTimer()});
    //             }else{
    //                 this.props.set_type('Session')
    //                 this.setState(state => ({
    //                     time: convertNum(state.SessionReducer.session)
    //                 }), () => {this.runTimer()});
    //             }
    //         }, 1000)
    //     }
    // }
    // componentDidUpdate() {
    //     this.handleChange();
    // }

    render(){
        return(
            <div>
                <h2 id="timer-label">{this.props.type}</h2>
                <div id="time-left">{this.props.timeStr}</div>
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
        sessionTime: state.SessionReducer.session,
        breakTime: state.BreakReducer.break,
        timeStr: state.TimerReducer.timeLeft
    };
}

const mapDispatchToProps = (dispatch) => {
    return{
        set_pause: () => {dispatch(set_pause())},
        set_type: (label) => {dispatch(set_type(label))},
        reset_controls: () => {dispatch(reset_controls())},
        reset_break: () => {dispatch(reset_break())},
        reset_session: () => {dispatch(reset_session())},
        reset_timer: () => {dispatch(reset_timer())},
        update_counter: (str) => {dispatch(update_counter(str))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Display);
