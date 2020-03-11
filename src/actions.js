export const INC_SESSION = "INC_SESSION";
export const DEC_SESSION = "DEC_SESSION";
export const INC_BREAK = "INC_BREAK";
export const DEC_BREAK = "DEC_BREAK";

export const SET_TIME = "SET_TIME";
export const UPDATE_COUNTER = "UPDATE_COUNTER";
export const SET_PAUSE = "SET_PAUSE";
export const SET_TYPE = "SET_TYPE";
export const RESET_CONTROLS = "RESET_CONTROLS";
export const RESET_BREAK = "RESET_BREAK";
export const RESET_SESSION = "RESET_SESSION";
export const RESET_TIMER = "RESET_TIMER";

//action creators
export function inc_session(state){
    return{
        type: INC_SESSION
    }   
};

export function dec_session(){
    return{
        type: DEC_SESSION
    }
};

export const inc_break = () => ({type: INC_BREAK});
export const dec_break = () => ({type: DEC_BREAK});

export const set_time = (time) => ({
    type: SET_TIME,
    time
});

export const update_counter = (str) => ({
    type: UPDATE_COUNTER,
    str
})

export const set_pause = () => ({type: SET_PAUSE});
export const set_type = (label) => ({
    type: SET_TYPE,
    label
});
export const reset_controls = () => ({type: RESET_CONTROLS});
export const reset_break = () => ({type: RESET_BREAK});
export const reset_session = () => ({type: RESET_SESSION});
export const reset_timer = () => ({type: RESET_TIMER});