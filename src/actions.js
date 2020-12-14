import store from './store';
import { SET_CONTRIBUTORS, 
         CLOSE_MODAL, 
         SET_ORGANISATION, 
         SET_REPOSITORIES, 
         ADD_MORE_REPOSITORIES, 
         SET_VALUE,
         NO_MORE_RESULT } from "./values";
        

// fetch the repository's contributors
 export let fetchContributors = (org, repo) => async (dispatch) => {
    try {
        let res = await fetch(`https://api.github.com/repos/${org}/${repo}/contributors`)
        let ctrs = await res.json();
        dispatch({ type: SET_CONTRIBUTORS, payload: ctrs.slice(0, 5) });
    } catch(err) {
        console.log(err);
    }
}   

//  close the contributors modal
export let closeModal = () => {
    return {
        type: CLOSE_MODAL
    }
}

// fetch organisation details
export let fetchOrganisationDetails = () => async (dispatch) => {
    let { orgName } = store.getState().main;

    try {
        let res = await fetch(`https://api.github.com/orgs/${orgName}`);
        let orgDetails = await res.json();
        dispatch({ type: SET_ORGANISATION, payload: orgDetails });

    } catch(err) {
        console.error(err);
    }
}

// fetch organisation's repositories
export let fetchRepositories = (initialRequest = false, page = store.getState().main.currentPage) => async (dispatch) => {
    let { orgName, perPage, repoType, repoSort, repoDirection } = store.getState().main;
    
    try {
        let res = await fetch(`https://api.github.com/orgs/${orgName}/repos?` + new URLSearchParams({
            per_page: perPage,
            page: page,
            type: repoType,
            sort: repoSort,
            direction: repoDirection, 
        }))

        let repos = await res.json();

        initialRequest ? dispatch({ type: SET_REPOSITORIES, payload: repos }) : 
        (
            repos.length > 0 ? dispatch({ type: ADD_MORE_REPOSITORIES, payload: repos }):
            dispatch({ type: NO_MORE_RESULT })
        );

    } catch(err) {
        console.log(err);
    }
    
}

// apply search filter
export let setValue = (name, value) => {
    return {
        type: SET_VALUE,
        payload: {
            name: name,
            value: value
        }
    }
}