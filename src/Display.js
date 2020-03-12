import React from 'react';
import {set_pause, set_type, reset_controls, reset_break, reset_session, reset_timer, set_time, update_counter} from './actions';
import {connect} from 'react-redux';

import {displayTimeLeft} from './functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faSync } from '@fortawesome/free-solid-svg-icons';

let countdown;

class Display extends React.Component{

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
        clearInterval(countdown); //possibly clearing the break timer before it's supposed to
 
        let secondsLeft = parseInt(this.props.timeStr.split(":")[0])*60+parseInt(this.props.timeStr.split(":")[1]);
        //console.log("time left before starting timer: "+secondsLeft+"s")

        countdown = setInterval(() => {

            // if(secondsLeft===0){
            //     console.log("timer reached zero, hit inside setInterval()")
            // }
            secondsLeft = secondsLeft - 1;

            // check if we should stop it!
            if(secondsLeft < 0) {
                console.log("stopped timer because it reached zero")
                clearInterval(countdown);
                return;
            }
            this.props.update_counter(displayTimeLeft(secondsLeft)); //note: cannot assign to prop as it's read only
            //console.log(this.props.timeStr)
        }, 1000);
        //console.log("finished timer")
    }
    handleChange = async () => {
        if(this.props.timeStr==='00:00'){
            const audio = document.getElementById('beep');
            audio.play();
            
            //console.log("about to change type")
            //setTimeout(()=>{ //need to delay 1 second to pass test
                if(this.props.type==='Session'){ 
                    //console.log("changed to break")
                    this.props.set_type('Break');
                    this.props.set_time(this.props.breakTime);
                }else{
                    //console.log("changed to session")
                    this.props.set_type('Session')
                    this.props.set_time(this.props.sessionTime);
                }
                await this.timeout(100);
                //console.log("start timer upon changing type")
                this.runTimer();
            //}, 1000)

        }
    }
    timeout = (ms) => {
        return new Promise(res => setTimeout(res,ms));
    }
    componentDidUpdate() {
        this.handleChange();
    }

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
        set_time: (time) => {dispatch(set_time(time))},
        update_counter: (str) => {dispatch(update_counter(str))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Display);
