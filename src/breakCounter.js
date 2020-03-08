import React from 'react';
import {inc_break, dec_break} from './actions';
import {connect} from 'react-redux';
import store from './store';

class BreakCounter extends React.Component{
    increment = () => {
        const state = store.getState();
        if(state.BreakReducer.break<60){
            this.props.inc_break();
        }
    }

    decrement = () => {
        const state = store.getState();
        if(state.BreakReducer.break>1){
            this.props.dec_break();
        }
    }

    render(){
        return(
            <div>
                <button id="break-decrement" onClick={this.decrement}>-</button>
                <div id="break-length">{this.props.break}</div>
                <button id="break-increment" onClick={this.increment}>+</button>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        break: state.BreakReducer.break
    };
}

const mapDispatchToProps = (dispatch) => {
    return{
       inc_break: () => {dispatch(inc_break())},
       dec_break: () => {dispatch(dec_break())}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BreakCounter);