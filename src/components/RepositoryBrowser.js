import React,  { Component } from 'react';
import Org from '../components/Organization';

class RepositoryBrowser extends Component {
    constructor() {
        super();
        this.state = {
            org: null,
            repos: null,
            currentPage: 0,
            nextPage: 1,
            perPage: 25,
            orgName: 'catalyst',
            repoType: 'all',
            repoSort: 'full_name',
            repoDirection: 'asc'
        };

        this._fetchOrganizationDetails = this._fetchOrganizationDetails.bind(this);
        this._fetchRepositories = this._fetchRepositories.bind(this);
        this._renderResults = this._renderResults.bind(this);
        this._renderRepos = this._renderRepos.bind(this);
        this._setFilter = this._setFilter.bind(this);
    }

    // call _fetchOrganizationDetails() to get the organization details after that the component is mounted!
    componentDidMount() {
        this._fetchOrganizationDetails();
    }

    // fetch organization details
    _fetchOrganizationDetails(){
        fetch(`https://api.github.com/orgs/${this.state.orgName}`)
            .then((res) => {
                return res.json();
            }).then(org => {
                this._fetchRepositories();
                this.setState({
                    org: org
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    // fetch organization's repositories
    _fetchRepositories(hasNewFilter = false){
        fetch(`https://api.github.com/orgs/${this.state.orgName}/repos?` + new URLSearchParams({
                 per_page: this.state.perPage,
                 page: this.state.nextPage,
                 type: this.state.repoType,
                 sort: this.state.repoSort,
                 direction: this.state.repoDirection, 
            }))
            .then((res) => {
                return res.json();
            }).then(repos => {
                if(hasNewFilter) {
                    this.setState({
                        repos: repos,
                    });
                } else {
                    this.setState({
                        repos: this.state.repos ? this.state.repos.concat(repos) : repos,
                    });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
    // apply search filter
    _setFilter(name, value) {
        this.setState({
            [name]: value,
            currentPage: 1
        });
    }

    // render the fetched repositories
    _renderRepos() {
        return <section className="repositories-section">
            <h2>Repositories: </h2>
            <div>
                <label>Repository type: </label>
                <select onChange={e => this._setFilter('repoType',e.target.value)}>
                    <option selected value="all">All</option>
                    <option value="sources">Not forked</option>
                    <option value="forks">Forked</option>
                </select>
            </div>
            <div>
                <label>Sort by: </label>
                <select onChange={e => this._setFilter('repoSort',e.target.value)}>
                    <option selected value="full_name">Full name</option>
                    <option value="created">Created time</option>
                    <option value="updated">Updated time</option>
                </select>
                <select onChange={e => this._setFilter('repoDirection',e.target.value)}>
                    <option selected value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

             <button onClick={() => this._fetchRepositories(true)}>Search</button>

           { 
                this.state.repos.map((repo, index) => { return <p>{++index + ". " + repo.name}</p> })
           }

        </section>
    }

    // render all the results (organization details and its repositories)
    _renderResults() {
        return (
            <div>
                <Org organization={this.state.org} />
                {
                    this.state.repos ? this._renderRepos() : <small className="loading-text">Loading...</small>
                }
            </div>
        );
    }

    render() {
        return (
            <div>
            <h1 className="title">Repository Browser</h1>
                {
                    this.state.org ? this._renderResults() : <small className="loading-text">Loading...</small>
                }
            </div>
        );
    }
}

export default RepositoryBrowser;