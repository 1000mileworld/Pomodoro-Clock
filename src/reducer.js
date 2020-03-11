import { combineReducers } from 'redux';
import {convertNum} from './functions';

export const startTime = '25:00';

const initialState = {
    break: 5,
    session: 25,
    timeLeft: startTime,
    isPaused: true,
    type: 'Session'
  };
  
function SessionReducer(state = {session: initialState.session, timeLeft: initialState.timeLeft}, action){
    switch(action.type){
        case 'INC_SESSION':
            return{
                session: state.session+1,
                timeLeft: state.timeLeft  
            };
        case 'DEC_SESSION':
            return{
                session: state.session-1,
                timeLeft: state.timeLeft 
            }
        case 'SET_SESSION':
            return{
                session: state.session,
                timeLeft: convertNum(action.time)
            }
        case 'UPDATE_COUNTER':
            return{
                session: state.session,
                timeLeft: action.str
            }
        case 'RESET_SESSION':
            return{
                session: initialState.session,
                timeLeft: startTime
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

// function TimerReducer(state = {timeLeft: initialState.timeLeft}, action){
//     switch(action.type){
//         case 'SET_SESSION':
//             return{
//                 timeLeft: convertNum(action.time)
//             }
//         case 'UPDATE_COUNTER':
//             return{
//                 timeLeft: action.str
//             }
//         default:
//             return state;
//     }
// }

const rootReducer = combineReducers({
    SessionReducer,
    BreakReducer,
    DisplayReducer
});

  export default rootReducer;
  