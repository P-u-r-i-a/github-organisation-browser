import { SET_CONTRIBUTORS, 
         SET_ORGANISATION, 
         SET_REPOSITORIES, 
         SET_VALUE,
         CLOSE_MODAL,   
         ADD_MORE_REPOSITORIES,
         NO_MORE_RESULT, 
         CHANGE_ORGANISATION} from "../values";

const initialState = { 
    orgName: process.env.REACT_APP_ORG_NAME ,
    contributors: null,
    modalVisibility: false,
    orgDetails: null,
    repos: null,
    currentPage: 1,
    hasMoreResult: true,
    perPage: 10,
    repoType: 'all',
    repoSort: 'full_name',
    repoDirection: 'asc'

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
        case SET_ORGANISATION:
            return {
                ...state, orgDetails: action.payload
            }
        case SET_REPOSITORIES:
            return {
                ...state, repos: action.payload, currentPage: 1, hasMoreResult: true
            }
        case ADD_MORE_REPOSITORIES:
            return {
                ...state, repos: state.repos ? state.repos.concat(action.payload) : action.payload,
            }
        case SET_VALUE:
            return {
                ...state, [action.payload.name]: action.payload.value
            }
        case NO_MORE_RESULT:
            return {
                ...state,  hasMoreResult: false, currentPage: 1
            }
        case CHANGE_ORGANISATION:
            return {
                ...initialState, orgName: action.payload
            } 
        default:
            return state;
    }
}

export default mainReducer;