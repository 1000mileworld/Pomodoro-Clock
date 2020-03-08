import React from 'react';
import {inc_session, dec_session} from './actions';
import {connect} from 'react-redux';
import store from './store';

class SessionCounter extends React.Component{
    increment = () => {
        const state = store.getState();
        if(state.SessionReducer.session<60 && state.OtherReducer.isPaused){
            this.props.inc_session();
        }
    }

    decrement = () => {
        const state = store.getState();
        if(state.SessionReducer.session>1 && state.OtherReducer.isPaused){
            this.props.dec_session();
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
       dec_session: () => {dispatch(dec_session())}
       //inc_session,
       //dec_session
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionCounter);