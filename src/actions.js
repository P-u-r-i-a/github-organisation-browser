import store from './store';
import { SET_CONTRIBUTORS, 
         CLOSE_MODAL, 
         SET_ORGANISATION, 
         SET_REPOSITORIES, 
         ADD_MORE_REPOSITORIES, 
         SET_VALUE,
         NO_MORE_RESULT } from "./values";
        

// fetch the repository's contributors
 export let fetchContributors = (org, repo) => (dispatch) => {
    fetch(`https://api.github.com/repos/${org}/${repo}/contributors`)
        .then((res) => {
            return res.json();
        }).then(ctr => {
            dispatch({
                type: SET_CONTRIBUTORS,
                payload: ctr.slice(0, 5)
            })
        })
        .catch(error => {
            console.error(error);
    });
}   

//  close the contributors modal
export let closeModal = () => {
    return {
        type: CLOSE_MODAL
    }
}

// fetch organisation details
export let fetchOrganisationDetails = () => (dispatch) => {
    let { orgName } = store.getState().main;

    fetch(`https://api.github.com/orgs/${orgName}`)
    .then((res) => {
        return res.json();
        }).then(orgDetails => {
            dispatch({
                type: SET_ORGANISATION,
                payload: orgDetails
            });
        })
    .catch(error => {
        console.error(error);
    });
}

// fetch organisation's repositories
export let fetchRepositories = (initialRequest = false, page = store.getState().main.currentPage) => (dispatch) => {
    let { orgName, perPage, repoType, repoSort, repoDirection } = store.getState().main;
    
    fetch(`https://api.github.com/orgs/${orgName}/repos?` + new URLSearchParams({
        per_page: perPage,
        page: page,
        type: repoType,
        sort: repoSort,
        direction: repoDirection, 
    }))
    .then((res) => {
        return res.json();
        }).then(repos => {
            if(initialRequest){
                dispatch({
                    type: SET_REPOSITORIES,
                    payload: repos
                });
            } else {
                if(repos.length > 0){
                    dispatch({
                        type: ADD_MORE_REPOSITORIES,
                        payload: repos
                    });
                } else {
                    dispatch({
                        type: NO_MORE_RESULT
                    });
                }
            }
        })
    .catch(error => {
        console.error(error);
    });
    
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