export const INC_SESSION = "INC_SESSION";
export const DEC_SESSION = "DEC_SESSION";
export const INC_BREAK = "INC_BREAK";
export const DEC_BREAK = "DEC_BREAK";

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