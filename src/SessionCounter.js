import React from 'react';
import {inc_session, dec_session, set_session} from './actions';
import {displayTimeLeft, convertNum} from './functions';
import {connect} from 'react-redux';
import store from './store';

class SessionCounter extends React.Component{
    increment = () => {
        const state = store.getState();
        //console.log(state.SessionReducer.timeLeft)
        if(state.SessionReducer.session<60 && state.DisplayReducer.isPaused){
            this.props.inc_session();
            this.props.set_session(this.props.session+1);
        }
    }

    decrement = () => {
        const state = store.getState();
        if(state.SessionReducer.session>1 && state.DisplayReducer.isPaused){
            this.props.dec_session();
            this.props.set_session(this.props.session-1);
        }
    }

    render(){
        return(
            <div>
                <button id="session-decrement" onClick={this.decrement}>-</button>
                <div id="session-length">{this.props.session}</div>
                <button id="session-increment" onClick={this.increment}>+</button>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        session: state.SessionReducer.session
    };
}

const mapDispatchToProps = (dispatch) => {
    return{
       inc_session: () => {dispatch(inc_session())},
       dec_session: () => {dispatch(dec_session())},
       set_session: (time) => {dispatch(set_session(time))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionCounter);