import React from 'react';

class BreakCounter extends React.Component{

    render(){
        return(
            <div>
                <button id="break-decrement" onClick={this.breakDec}>-</button>
                <div id="break-length">{this.state.break}</div>
                <button id="break-increment" onClick={this.breakInc}>+</button>
            </div>
        );
    }
}

export default BreakCounter;