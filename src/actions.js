export const INC_SESSION = "INC_SESSION";
export const DEC_SESSION = "DEC_SESSION";

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