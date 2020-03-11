import { combineReducers } from 'redux';
import {convertNum} from './functions';

const initialState = {
    break: 5,
    session: 25,
    timeLeft: '25:00',
    isPaused: true,
    type: 'Session'
  };
  
function SessionReducer(state = {session: initialState.session}, action){
    switch(action.type){
        case 'INC_SESSION':
            return{
                session: state.session+1,
            };
        case 'DEC_SESSION':
            return{
                session: state.session-1,
            }
        case 'RESET_SESSION':
            return{
                session: initialState.session,
            }
        default:
            return state;
    }
}

function BreakReducer(state = {break: initialState.break}, action){
    switch(action.type){
        case 'INC_BREAK':
            return{
                break: state.break+1  
            };
        case 'DEC_BREAK':
            return{
                break: state.break-1
            }
        case 'RESET_BREAK':
            return{
                break: initialState.break
            }
        default:
            return state;
    }
}

function DisplayReducer(state = {isPaused: initialState.isPaused, type: initialState.type}, action){
    switch(action.type){
        case 'SET_PAUSE':
            return{
                isPaused: !state.isPaused,
                type: state.type
            }
        case 'SET_TYPE':
            return{
                isPaused: state.isPaused,
                type: action.label
            }
        case 'RESET_CONTROLS':
            return{
                isPaused: initialState.isPaused,
                type: initialState.type
            }
        default:
            return state;
    }
}

function TimerReducer(state = {timeLeft: initialState.timeLeft}, action){
    switch(action.type){
        case 'SET_TIME':
            return{
                timeLeft: convertNum(action.time)
            }
        case 'UPDATE_COUNTER':
            return{
                timeLeft: action.str
            }
        case 'RESET_TIMER':
            return{
                timeLeft: initialState.timeLeft
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    SessionReducer,
    BreakReducer,
    DisplayReducer,
    TimerReducer
});

  export default rootReducer;
  