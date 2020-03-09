import React from 'react';
import {inc_session, dec_session, update_time} from './actions';
import {connect} from 'react-redux';
import store from './store';

class SessionCounter extends React.Component{
    increment = () => {
        const state = store.getState();
        if(state.SessionReducer.session<60 && state.DisplayReducer.isPaused){
            this.props.inc_session();
            //this.props.update_time();
        }
    }

    decrement = () => {
        const state = store.getState();
        if(state.SessionReducer.session>1 && state.DisplayReducer.isPaused){
            this.props.dec_session();
            this.props.update_time();
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
       update_time: () => {dispatch(update_time())}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionCounter);