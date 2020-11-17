import { CLOSE_MODAL, SET_CONTRIBUTORS } from "../values";

const initialState = { 
    contributors: null,
    modalVisibility: false,
};

let mainReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_CONTRIBUTORS:
            return {
            ...state,  contributors : action.payload , modalVisibility: true
        }
        case CLOSE_MODAL:
            return {
                ...state, contributors: null , modalVisibility: false
            }
        default:
            return state;
    }
}

export default mainReducer;