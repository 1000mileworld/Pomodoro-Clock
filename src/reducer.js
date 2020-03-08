import { combineReducers } from 'redux';
//import {displayTimeLeft} from './functions';

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
                session: state.session+1  
            };
        case 'DEC_SESSION':
            return{
                session: state.session-1
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
        default:
            return state;
    }
}

function OtherReducer(state = {timeLeft: initialState.timeLeft, isPaused: initialState.isPaused, type: initialState.type}, action){
    switch(action.type){
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    SessionReducer,
    BreakReducer,
    OtherReducer
});

  export default rootReducer;
  