import { SET_CONTRIBUTORS, CLOSE_MODAL } from "./values";

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