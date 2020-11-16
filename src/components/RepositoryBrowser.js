import React,  { Component } from 'react';
import Org from '../components/Organisation';
import Repository from '../components/Repository';

class RepositoryBrowser extends Component {
    constructor() {
        super();
        this.state = {
            org: null,
            repos: null,
            currentPage: 1,
            hasMoreResults: true,
            perPage: 10,
            orgName: 'catalyst',
            repoType: 'all',
            repoSort: 'full_name',
            repoDirection: 'asc'
        };

        this._fetchOrganisationDetails = this._fetchOrganisationDetails.bind(this);
        this._fetchRepositories = this._fetchRepositories.bind(this);
        this._renderResults = this._renderResults.bind(this);
        this._renderRepos = this._renderRepos.bind(this);
        this._setFilter = this._setFilter.bind(this);
        this._fetchMore = this._fetchMore.bind(this);
    }

    // call _fetchOrganisationDetails() to get the organisation details after that the component is mounted!
    componentDidMount() {
        this._fetchOrganisationDetails();
    }

    // fetch organisation details
    _fetchOrganisationDetails(){
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

    // fetch organisation's repositories
    _fetchRepositories(hasNewFilter = false, page= this.state.currentPage){
        fetch(`https://api.github.com/orgs/${this.state.orgName}/repos?` + new URLSearchParams({
                 per_page: this.state.perPage,
                 page: page,
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
                        hasMoreResults: true,
                    });
                } else {
                        if(repos.length > 0){
                            this.setState({
                            repos: this.state.repos ? this.state.repos.concat(repos) : repos,
                             });
                        } else {
                         this.setState({ hasMoreResults: false });
                    }
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
    // load more data when users click on the Load more button!
    _fetchMore(){
         this._fetchRepositories(false, this.state.currentPage + 1);
          this.setState({
            currentPage: this.state.currentPage + 1
         })
    }

    // render the fetched repositories
    _renderRepos() {
        return <section className="repositories-section">
            <div className="search-filter-area card">
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
                   <div className="form-group">
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
                </div>
             <button className="search-btn" onClick={() => this._fetchRepositories(true)}>Search</button>

            </div>

             <h2>Repositories: </h2>
             <div className="respositories-wrapper">
                {    
                    this.state.repos.map((repo, index) => { 
                    return <Repository organisation={this.state.orgName} repository={repo} key={index} /> })
                }
             </div>
           

        </section>
    }

    // render all the results (organisation details and its repositories)
    _renderResults() {
        return (
            <div>
                <Org organisation={this.state.org} />
                {
                    this.state.repos ? this._renderRepos() : <small className="loading-text">Loading...</small>
                }
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                {
                    this.state.org ? this._renderResults() : <small className="loading-text">Loading...</small>
                }
                {
                    this.state.repos && this.state.hasMoreResults ? <button className="load-more-btn" onClick={()=> this._fetchMore()}>Load More ...</button> : ""
                }
            </div>
        );
    }
}

export default RepositoryBrowser;